# E-commerce

A full-stack, responsive Next.js implementation of an e-commerce store.

## Features

1. Inventory management with CRUD features for products/SKUs, categories and brands
2. JWT authentication and authorization for admins
3. Secure payment with Stripe API (Test mode only) integration
4. Product search, filter and pagination

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
