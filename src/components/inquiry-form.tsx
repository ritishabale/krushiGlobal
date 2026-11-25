"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories, products } from "@/lib/catalogue";

const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  companyName: z.string().trim().min(1, "Please enter your company name."),
  email: z.string().trim().email("Enter a valid business email."),
  phone: z.string().trim().regex(/^[+\d\s().-]{7,24}$/, "Enter a valid phone number."),
  country: z.string().trim().min(2, "Please enter your country."),
  category: z.string().min(1, "Select a product category."),
  productNames: z.array(z.string()).min(1, "Select at least one product."),
  quantity: z.string().trim().min(1, "Please share your required quantity."),
  packaging: z.string().trim().min(1, "Please describe your packaging requirement."),
  destinationCountry: z.string().trim().min(2, "Please enter the destination country."),
  message: z.string().trim().min(10, "Please add a little more detail (at least 10 characters).").max(3000),
  website: z.string(),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const initialValues: InquiryValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  category: "",
  productNames: [],
  quantity: "",
  packaging: "",
  destinationCountry: "",
  message: "",
  website: "",
};

const productNames = [...new Set(products.map((product) => product.name))];

export function InquiryForm() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") ?? "";
  const requestedCategory = searchParams.get("category") ?? "";
  const initialCategory = categories.find((category) => category.slug === requestedCategory)?.name
    ?? categories.find((category) => category.products.includes(initialProduct))?.name
    ?? "";
  const [submittedReference, setSubmittedReference] = useState("");
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<InquiryValues>({
    defaultValues: {
      ...initialValues,
      category: initialCategory,
      productNames: productNames.includes(initialProduct) ? [initialProduct] : [],
      message: initialProduct ? `I am interested in ${initialProduct}. Please share product details and a quotation.` : "",
    },
  });

  const onSubmit = async (values: InquiryValues, event?: React.BaseSyntheticEvent) => {
    setServerError("");
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof InquiryValues | undefined;
        if (key) setError(key, { message: issue.message });
      }
      return;
    }

    const formElement = event?.target as HTMLFormElement | undefined;
    const file = formElement?.querySelector<HTMLInputElement>('input[name="attachment"]')?.files?.[0];
    if (file && (file.size > 5 * 1024 * 1024 || !["application/pdf", "image/jpeg", "image/png"].includes(file.type))) {
      setServerError("Attachments must be a PDF, JPG or PNG smaller than 5 MB.");
      return;
    }

    const payload = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => {
      if (key === "productNames") {
        (value as string[]).forEach((product) => payload.append("productNames", product));
      } else {
        payload.append(key, value as string);
      }
    });
    if (file) payload.append("attachment", file);

    try {
      const response = await fetch("/api/inquiries", { method: "POST", body: payload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not submit your inquiry. Please try again.");
      setSubmittedReference(result.reference);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (submittedReference) {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={32} />
        <span className="eyebrow">INQUIRY RECEIVED</span>
        <h2>Thank you for reaching out.</h2>
        <p>Your reference is <strong>{submittedReference}</strong>. Our team will be in touch using the details you provided.</p>
        <Link href="/" className="button button-dark-outline">Return to home <ArrowRight size={15} /></Link>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-section-title"><span>01</span><div><h2>Your details</h2><p>Tell us who we&apos;re speaking with.</p></div></div>
      <div className="form-grid">
        <Field label="Full name" error={errors.fullName?.message}><input autoComplete="name" {...register("fullName")} /></Field>
        <Field label="Company name" error={errors.companyName?.message}><input autoComplete="organization" {...register("companyName")} /></Field>
        <Field label="Business email" error={errors.email?.message}><input type="email" autoComplete="email" {...register("email")} /></Field>
        <Field label="Phone number" error={errors.phone?.message}><input type="tel" autoComplete="tel" {...register("phone")} /></Field>
        <Field label="Your country" error={errors.country?.message}><input autoComplete="country-name" {...register("country")} /></Field>
        <Field label="Destination country" error={errors.destinationCountry?.message}><input {...register("destinationCountry")} /></Field>
      </div>

      <div className="form-section-title"><span>02</span><div><h2>Product requirement</h2><p>Select one or more products to get the conversation started.</p></div></div>
      <Field label="Product category" error={errors.category?.message}>
        <select {...register("category")} defaultValue="">
          <option value="" disabled>Select a category</option>
          {categories.map((category) => <option value={category.name} key={category.slug}>{category.name}</option>)}
        </select>
      </Field>
      <fieldset className="product-select-field">
        <legend>Products of interest <span>*</span></legend>
        <div className="product-select-list">
          {productNames.map((product) => (
            <label key={product}><input type="checkbox" value={product} {...register("productNames")} /><span>{product}</span></label>
          ))}
        </div>
        {errors.productNames && <small className="field-error">{errors.productNames.message}</small>}
      </fieldset>
      <div className="form-grid">
        <Field label="Required quantity" error={errors.quantity?.message}><input placeholder="e.g. 500 kg / please advise" {...register("quantity")} /></Field>
        <Field label="Packaging requirement" error={errors.packaging?.message}><input placeholder="Bulk, retail or custom" {...register("packaging")} /></Field>
      </div>
      <Field label="Message" error={errors.message?.message}><textarea rows={5} placeholder="Share a little more about your requirements..." {...register("message")} /></Field>
      <Field label="Attach requirements (optional)" hint="PDF, JPG or PNG · up to 5 MB">
        <input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" />
      </Field>
      <div className="honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" {...register("website")} /></label></div>
      {serverError && <p className="form-error" role="alert">{serverError}</p>}
      <div className="form-submit-row">
        <p>Fields marked <span>*</span> are required. Your details are used only to respond to this inquiry.</p>
        <button className="button" disabled={isSubmitting} type="submit">{isSubmitting ? "Sending inquiry..." : "Send inquiry"} <ArrowRight size={15} /></button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field">
      <span>{label}{!hint && <b> *</b>}</span>
      {children}
      {hint && <small>{hint}</small>}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
