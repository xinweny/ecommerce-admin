# E-commerce

A full-stack, responsive Next.js implementation of an e-commerce store.

- Storefront: https://next-ecommerce-store-sigma.vercel.app
- Admin dashboard: https://next-ecommerce-admin-phi.vercel.app

## Features

1. Inventory management with CRUD features for products/SKUs, categories and brands
2. Quickly sort and find data with customized search, filter and pagination features
3. Sales data summary by day/week/month
4. JWT authentication and authorization for admins
5. Secure payment with Stripe API (Test mode only) integration

## Installation

### Setup local repo

```bash
git clone https://github.com/xinweny/next-ecommerce.git
cd next-ecommerce
```

### Admin dashboard setup

```bash
cd ./store

# Copy .env template and fill it out
cp .env.example .env

npm install
npx prisma generate

npm run dev
```

### Store setup

```bash
cd ./admin

# Copy .env template and fill it out
cp .env.example .env

npm install
npx prisma generate

npm run dev
```

Additionally, you will need to set up a webhook event forwarder and listener with Stripe - detailed instructions [here](https://docs.stripe.com/webhooks/quickstart).

## Disclaimer

This project is intended for personal and educational purposes only. Please only use [Stripe test payment cards](https://docs.stripe.com/testing) on checkout.
