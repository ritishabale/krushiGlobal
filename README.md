# Krushi Global Foods and Spices

A responsive Next.js App Router website and business inquiry experience for Krushi Global Foods and Spices.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public website works without credentials. Copy the Supabase and Resend values into `.env.local` to enable quote/contact submissions and the admin dashboard. Never expose the Supabase service-role key in a `NEXT_PUBLIC_` variable or commit `.env.local`.

## Inquiry setup

1. Create a Supabase project and run `supabase/migrations/20261125000000_create_inquiries.sql` in its SQL editor.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment. The service-role key is used only by the inquiry API routes.
3. Configure a Resend API key and a verified sender address as `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Set `INQUIRY_TO_EMAIL` to the address that should receive leads.
4. Submit a test quote and contact message. The APIs return a success reference only after storage and both email requests succeed. Missing configuration returns an error, never a false success.

Optional RFQ attachments are limited to PDF, JPG and PNG files up to 5 MB and are stored in the private `inquiry-attachments` bucket created by the migration.

## Admin access

The `/admin` page uses Supabase Auth with the public anon key and does not contain a service key. Create the administrator account through Supabase Auth, then set its trusted `app_metadata.role` to `admin` using the Supabase dashboard or a secure server-side admin process. Never set admin privileges through user-editable metadata. Inquiry reads, status updates and private attachment access are protected by the migration's row-level security policies. CSV export includes the currently filtered inquiries.

## Product and imagery notes

The product catalogue is based on the product names and categories supplied for this project. Product claims, specifications, certification marks, prices, shelf life and availability are intentionally not invented; confirm product-specific details with the company before publication. No company brochure PDF was supplied, so the catalogue page offers a request path rather than a fabricated download.

Photography currently uses Unsplash image URLs as editorial placeholders. Replace them with company-owned or properly licensed, approved product and facility photographs before launch. The addresses and contact details displayed on the site are the details provided for this project.

## Validation

```bash
npm run lint
npm run build
```
