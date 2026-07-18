# Prisma Press — Backend

REST API for the Prisma Press blogging platform: authentication, posts, comments, role-based authorization, Stripe subscriptions, and premium content gating. Built with Express, Prisma, PostgreSQL, and TypeScript, and documented with Swagger.

> **Repository description:** REST API for a modern blogging platform — users, posts, comments, subscriptions, and premium content — built with Express, Prisma, PostgreSQL, and TypeScript. Live docs at `/api/docs`.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Stripe Webhook (Local)](#stripe-webhook-local)
- [Dependencies](#dependencies)
- [Links](#links)

---

## Overview

Prisma Press backend is a Node.js/Express REST API that powers a publishing platform with three roles (`USER`, `AUTHOR`, `ADMIN`). It exposes JWT-based authentication (access + refresh tokens stored in HTTP-only cookies), full CRUD for posts and comments, moderation tools, Stripe-backed premium subscriptions, and a `subscriptionGuard` middleware that gates premium posts.

---

## Features

- **Authentication** — register, login, and refresh-token rotation using HTTP-only cookies
- **Role-based authorization** — `USER`, `AUTHOR`, and `ADMIN` roles with route-level guards
- **Posts** — create, list (paginated/searchable), get by id, update, delete, per-user posts, and admin stats
- **Comments** — create, list by post or author, update, delete, and moderate
- **Subscriptions** — Stripe Checkout session creation and webhook processing for premium access
- **Premium content** — gated premium-only content listing for active subscribers
- **API documentation** — interactive Swagger UI at `/api/docs`
- **Validation & error handling** — central `globalErrorHandler` and 404 middleware

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Language:** TypeScript
- **Framework:** Express 5
- **ORM / Database:** Prisma 7 with PostgreSQL
- **Auth:** JWT (`jsonwebtoken`) + `cookie-parser` + `bcryptjs`
- **Payments:** Stripe
- **Docs:** Swagger UI + `swagger-jsdoc`
- **Dev tooling:** `tsx`, `tsc`

---

## API Documentation

Once the server is running, browse the interactive Swagger UI:

```
http://localhost:5000/api/docs
```

Raw JSON spec:

```
http://localhost:5000/api/docs-json
```

Modules documented: **Auth**, **Users**, **Posts**, **Comments**, **Subscription**, **Premium**.

---

## Project Structure

```
prisma-press-backend/
├── prisma/                     # Prisma schema and migrations
├── generated/                  # Generated Prisma client
├── src/
│   ├── app.ts                  # Express app + Swagger UI mount
│   ├── server.ts               # Server entry point
│   ├── config/                 # Environment + Swagger config
│   ├── lib/                    # Prisma client setup
│   ├── middlewares/            # auth, errorHandler, notFound, premiumGuard
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── post/
│   │   ├── comment/
│   │   ├── subscription/
│   │   └── premium/
│   └── utils/                  # catchAsync, sendResponse, etc.
├── prisma.config.ts
├── tsconfig.json
└── package.json
```

---

## Prerequisites

- Node.js **18+**
- npm (or pnpm / yarn)
- A PostgreSQL database (local or hosted)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd prisma-press-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   See [Environment Variables](#environment-variables) below.

4. **Set up the database**

   Make sure `DATABASE_URL` points to a reachable PostgreSQL instance, then run the Prisma migrations / generate the client:

   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

   For local development with a fresh schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Run the server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000` and Swagger UI at `http://localhost:5000/api/docs`.

6. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## Available Scripts

| Script            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start the server with `tsx watch` (auto-reload)   |
| `npm run build`   | Compile TypeScript to `dist/`                     |
| `npm start`       | Run the compiled server                           |
| `npm run stripe:webhook` | Forward Stripe webhooks to the local server |

---

## Environment Variables

Defined in `.env` (see `.env.example` for the template):

| Variable                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| `PORT`                    | Port the API listens on (default `5000`)     |
| `APP_URL`                 | Frontend origin (used for CORS)              |
| `DATABASE_URL`            | PostgreSQL connection string                 |
| `BCRYPT_SALT_ROUNDS`      | bcrypt cost factor for password hashing      |
| `JWT_ACCESS_SECRET`       | Secret used to sign access tokens            |
| `JWT_REFRESH_SECRET`      | Secret used to sign refresh tokens           |
| `JWT_ACCESS_EXPIRES_IN`   | Access token expiry (e.g. `1d`)              |
| `JWT_REFRESH_EXPIRES_IN`  | Refresh token expiry (e.g. `7d`)             |
| `STRIPE_PRODUCT_PRICE_ID` | Stripe price id for the premium plan         |
| `STRIPE_SECRET_KEY`       | Stripe secret key                            |
| `STRIPE_WEBHOOK_SECRET`   | Stripe webhook signing secret                |

---

## Stripe Webhook (Local)

The Stripe CLI can forward events to your local server:

```bash
stripe login
npm run stripe:webhook
```

The configured forward target is `http://localhost:5000/api/subscription/webhook`.

---

## Dependencies

**Runtime**

- `@prisma/adapter-pg`, `@prisma/client`
- `bcryptjs`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `http-status`
- `jsonwebtoken`
- `pg`
- `stripe`
- `swagger-ui-express`
- `swagger-jsdoc`

**Dev**

- `prisma`
- `tsx`
- `typescript`
- `@types/cookie-parser`
- `@types/cors`
- `@types/express`
- `@types/jsonwebtoken`
- `@types/node`
- `@types/pg`
- `@types/swagger-jsdoc`
- `@types/swagger-ui-express`

---

## Links

- **API Docs (local):** `http://localhost:5000/api/docs`
- **Prisma:** [https://www.prisma.io](https://www.prisma.io)
- **Stripe:** [https://stripe.com/docs](https://stripe.com/docs)
- **Express:** [https://expressjs.com](https://expressjs.com)

---

> Add a screenshot of the Swagger UI or a frontend integration here once available:
>
> `![Swagger UI](./docs/swagger-screenshot.png)`