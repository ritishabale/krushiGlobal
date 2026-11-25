import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  companyName: z.string().trim().max(180),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().regex(/^[+\d\s().-]{7,24}$/),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0),
});

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
  if (contentLength > 20 * 1024) {
    return Response.json({ error: "Your message is too long." }, { status: 413 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  const recipient = process.env.INQUIRY_TO_EMAIL;
  if (!supabaseUrl || !serviceRoleKey || !resendKey || !sender || !recipient) {
    return Response.json({ error: "Contact service is not configured. Please contact us by phone or email." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please submit a valid message." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Please check your details and try again." }, { status: 400 });

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const reference = `KGF-${new Date().toISOString().slice(0, 7).replace("-", "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const { data, error: insertError } = await supabase.from("inquiries").insert({
    reference,
    full_name: parsed.data.fullName,
    company_name: parsed.data.companyName || "Not provided",
    email: parsed.data.email,
    phone: parsed.data.phone,
    country: "Not provided",
    category: "General enquiry",
    product_names: [],
    quantity: "Not specified",
    packaging: "Not specified",
    destination_country: "Not specified",
    message: parsed.data.message,
    status: "new",
  }).select("reference").single();
  if (insertError || !data) {
    console.error("Contact message could not be saved", insertError);
    return Response.json({ error: "We could not save your message. Please try again." }, { status: 500 });
  }

  const note = `Reference: ${reference}\nName: ${parsed.data.fullName}\nCompany: ${parsed.data.companyName || "Not provided"}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\n\n${parsed.data.message}`;
  const emails = [
    { from: sender, to: [recipient], reply_to: parsed.data.email, subject: `New contact message ${reference}`, text: note },
    { from: sender, to: [parsed.data.email], subject: `We received your message · ${reference}`, text: `Hello ${parsed.data.fullName},\n\nThank you for contacting Krushi Global Foods and Spices. Our team has received your message.\n\n${note}\n\nKrushi Global Foods and Spices` },
  ];
  try {
    const results = await Promise.all(emails.map((email) => fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: ["Bearer", resendKey].join(" "), "Content-Type": "application/json" },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(10_000),
    })));
    if (results.some((result) => !result.ok)) throw new Error("Email delivery failed.");
  } catch (error) {
    console.error("Contact message email delivery failed", { reference, error });
    return Response.json({ error: `Your message could not be fully processed. Please call us and share reference ${reference}.` }, { status: 502 });
  }

  return Response.json({ reference }, { status: 201 });
}
