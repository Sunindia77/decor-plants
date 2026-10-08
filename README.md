# decor-plants

Plants, garden maintenance, balcony gardening, garden design, and related services.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## SEO Deployment Configuration

Set `NEXT_PUBLIC_SITE_URL` to the public production origin before deployment, for example `https://www.your-domain.com` (without a trailing slash). The sitemap at `/sitemap.xml` uses this value to list the homepage and all service pages, and `/robots.txt` references that sitemap. Without the value, the sitemap intentionally returns no URLs rather than publishing a placeholder domain.

The service pages include Pune-focused titles, descriptions, visible copy and FAQs. Search position and eligibility for search result enhancements are determined by search engines and are not guaranteed by metadata or structured data alone.

## Google Sign-in

Customer sign-in and account creation use Google OAuth through Supabase Auth. Copy `.env.example` to `.env.local` and set:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
```

In Supabase, enable Google under **Authentication → Providers** and add your site callback URL (`https://your-domain.com/api/auth/callback`; for local development, `http://localhost:3000/api/auth/callback`) to the Supabase Auth redirect URL allow-list. Configure the Google OAuth client with Supabase's callback URL (`https://<project-ref>.supabase.co/auth/v1/callback`) as an authorized redirect URI, then enter the Google client ID and secret in the Supabase provider settings. No service-role key or Google client secret is exposed to the browser. OAuth is initiated and completed on server routes, and the session is stored in secure, HTTP-only cookies in production. The existing API proxy also applies its IP rate limit to auth endpoints.

The `/login` page supports Google sign-in and safe same-site return paths. New customers are created automatically by Supabase on their first successful Google sign-in. `/account` and `/checkout` require a valid Supabase session. Guest product browsing, cart, and wishlist remain available.

## Customer Profiles, Orders, and Tracking

Apply the migrations under `supabase/migrations/` to the Supabase project using the Supabase CLI (`supabase db push`) or paste them into the Supabase SQL Editor in timestamp order. If the customer-order migration was already applied, also apply `20261008225000_admin_order_read_access.sql` to enable the admin's cross-customer order-history view.

Order creation requires a **server-only** Supabase secret key because order writes must bypass customer write permissions while the server checks the signed-in identity and recalculates prices from the catalog. Set `SUPABASE_SECRET_KEY` in the local `.env.local` and production hosting environment. Never prefix it with `NEXT_PUBLIC_`, put its value in `.env.example`, or send it to the browser. The existing `SUPABASE_URL` and `SUPABASE_ANON_KEY` remain the public-key settings. The `/checkout` page and order API require a signed-in Google account; checkout details and catalog prices are bound to that verified user on the server.

The account page reads the authenticated user's Google profile and order history. Customers can read only their own orders. The allowlisted admin account `surajsatav1994@gmial.com` can read all orders and tracking details from the same account page; this is enforced by row-level security in the order and order-item policies. The admin exception is read-only and does not expose customer profile data or grant permission to edit orders. Staff can update `customer_orders.status`, `tracking_number`, and `tracking_url` through the Supabase dashboard; status changes are manual—live carrier tracking is not integrated. Orders accepted by the old in-memory endpoint were not stored, so only orders placed after this migration and implementation will appear in history.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
