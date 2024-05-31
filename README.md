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

Clone the repository

```bash
git clone https://github.com/xinweny/next-ecommerce.git
cd next-ecommerce
```

Admin dashboard setup

```bash
cd ./store

# Copy .env template and fill it out
cp .env.example .env

npm install

npm run dev
```

Store setup

```bash
cd ./admin

# Copy .env template and fill it out
cp .env.example .env

npm install

npm run dev
```

## Disclaimer
