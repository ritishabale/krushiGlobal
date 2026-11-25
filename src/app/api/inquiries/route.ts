import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(1).max(180),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().regex(/^[+\d\s().-]{7,24}$/),
  country: z.string().trim().min(2).max(100),
  category: z.string().trim().min(1).max(120),
  productNames: z.array(z.string().trim().min(1).max(120)).min(1).max(30),
  quantity: z.string().trim().min(1).max(120),
  packaging: z.string().trim().min(1).max(250),
  destinationCountry: z.string().trim().min(2).max(100),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0),
});

const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
const maxFileSize = 5 * 1024 * 1024;
const maxRequestSize = maxFileSize + 64 * 1024;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) {
        return Response.json({ error: "Cross-origin submissions are not allowed." }, { status: 403 });
      }
    } catch {
      return Response.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestSize) {
    return Response.json({ error: "Your attachment is too large. The maximum file size is 5 MB." }, { status: 413 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const recipient = process.env.INQUIRY_TO_EMAIL;

  if (!supabaseUrl || !serviceRoleKey || !resendKey || !sender || !recipient) {
    return Response.json({ error: "Inquiry service is not configured. Please contact us by phone or email." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Please submit a valid inquiry form." }, { status: 400 });
  }

  const values = {
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    category: formData.get("category"),
    productNames: formData.getAll("productNames"),
    quantity: formData.get("quantity"),
    packaging: formData.get("packaging"),
    destinationCountry: formData.get("destinationCountry"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  };
  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const attachment = formData.get("attachment");
  if (attachment && attachment instanceof File && attachment.size > 0) {
    if (attachment.size > maxFileSize || !allowedTypes.has(attachment.type)) {
      return Response.json({ error: "Attachments must be a PDF, JPG or PNG smaller than 5 MB." }, { status: 400 });
    }
    const signature = new Uint8Array(await attachment.slice(0, 8).arrayBuffer());
    const isPdf = attachment.type === "application/pdf" && new TextDecoder().decode(signature.slice(0, 5)) === "%PDF-";
    const isJpeg = attachment.type === "image/jpeg" && signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
    const isPng = attachment.type === "image/png" && signature.slice(0, 8).join(",") === "137,80,78,71,13,10,26,10";
    if (!isPdf && !isJpeg && !isPng) {
      return Response.json({ error: "The attachment file does not match its claimed type." }, { status: 400 });
    }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const reference = `KGF-${new Date().toISOString().slice(0, 7).replace("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  let attachmentPath: string | null = null;

  try {
    if (attachment instanceof File && attachment.size > 0) {
      attachmentPath = `${reference}/${crypto.randomUUID()}`;
      const { error: uploadError } = await supabase.storage
        .from("inquiry-attachments")
        .upload(attachmentPath, attachment, { contentType: attachment.type, upsert: false });
      if (uploadError) throw new Error("Could not save your attachment. Please try again without it.");
    }

    const inquiry = { ...parsed.data };
    const { error: insertError } = await supabase.from("inquiries").insert({
      reference,
      full_name: inquiry.fullName,
      company_name: inquiry.companyName,
      email: inquiry.email,
      phone: inquiry.phone,
      country: inquiry.country,
      category: inquiry.category,
      product_names: inquiry.productNames,
      quantity: inquiry.quantity,
      packaging: inquiry.packaging,
      destination_country: inquiry.destinationCountry,
      message: inquiry.message,
      attachment_path: attachmentPath,
      status: "new",
    });
    if (insertError) throw new Error("We could not save your inquiry. Please try again.");

    const summary = [
      `Reference: ${reference}`,
      `Name: ${inquiry.fullName}`,
      `Company: ${inquiry.companyName}`,
      `Business email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Country: ${inquiry.country}`,
      `Category: ${inquiry.category}`,
      `Products: ${inquiry.productNames.join(", ")}`,
      `Quantity: ${inquiry.quantity}`,
      `Packaging: ${inquiry.packaging}`,
      `Destination: ${inquiry.destinationCountry}`,
      `Message: ${inquiry.message}`,
      attachmentPath ? "An attachment is available in private Supabase storage." : "No attachment provided.",
    ].join("\n");
    const emailRequests = [
      {
        from: sender,
        to: [recipient],
        reply_to: inquiry.email,
        subject: `New product inquiry ${reference}`,
        text: summary,
      },
      {
        from: sender,
        to: [inquiry.email],
        subject: `We received your inquiry · ${reference}`,
        text: `Hello ${inquiry.fullName},\n\nThank you for contacting Krushi Global Foods and Spices. We have received your inquiry and will be in touch.\n\nYour reference: ${reference}\n\n${summary}\n\nKrushi Global Foods and Spices`,
      },
    ];

    const emailResults = await Promise.all(emailRequests.map((email) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: ["Bearer", resendKey].join(" "), "Content-Type": "application/json" },
        body: JSON.stringify(email),
        signal: AbortSignal.timeout(10_000),
      }),
    ));
    if (emailResults.some((result) => !result.ok)) {
      console.error("Inquiry email delivery failed", { reference, statuses: emailResults.map((result) => result.status) });
      return Response.json({ error: "Your inquiry could not be fully processed. Please contact us by phone or email and share reference " + reference + "." }, { status: 502 });
    }

    return Response.json({ reference }, { status: 201 });
  } catch (error) {
    if (attachmentPath) {
      await supabase.storage.from("inquiry-attachments").remove([attachmentPath]).catch(() => undefined);
    }
    console.error("Inquiry submission failed", error);
    return Response.json({
      error: error instanceof Error ? error.message : "We could not submit your inquiry. Please try again.",
    }, { status: 500 });
  }
}
