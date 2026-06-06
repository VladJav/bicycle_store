# Biker Bicycle Store

Final college project: a Next.js bicycle store with product browsing, cart, checkout, profile order history, and an admin dashboard.

## Tech Stack

- Next.js 15
- React 19
- Prisma + PostgreSQL
- NextAuth credentials and Google auth
- Stripe Payment Element
- Tailwind CSS / shadcn-style UI components

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with the required values:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
AWS_BUCKET_NAME=""
```

3. Apply migrations and generate Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

4. Seed demo data:

```bash
npm exec prisma db seed
```

Demo accounts:

- Admin: `admin@biker.test` / `Admin12345`
- Customer: `customer@biker.test` / `Customer12345`

5. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Flow

- Browse products from the home page or `/product`.
- Use search, price/color filters, and sorting.
- Add bicycles to cart with selected color and quantity.
- Sign in as the customer and complete checkout with Stripe test card `4242 4242 4242 4242`.
- View saved orders in `/profile`.
- Sign in as admin and manage products, customers, orders, and statuses in `/dashboard`.

## Useful Commands

```bash
npx tsc --noEmit
npm run build
npx prisma studio
```
