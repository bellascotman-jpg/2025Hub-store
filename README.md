# 2025Hub Store

A mobile-first, multi-vendor storefront and WhatsApp ordering platform for Nigerian small businesses.

## Current build status

This repository is being built in phases. The first milestone establishes the storefront UI, product browsing, local cart and wishlist, and WhatsApp order handoff. Supabase-backed vendor accounts, persisted orders, and verified online payments are separate milestones and must not be treated as live until implemented and tested.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Cloudflare D1 (planned SQL database), R2 (planned image storage), Workers (application runtime)
- Paystack (planned; payment must be verified server-side)
- WhatsApp click-to-chat

## Local development

1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in credentials when backend features are added.
4. Run `npm run dev`.

## Demo content

Any sample products/prices shown before the store owner verifies the Instagram catalogue are illustrative only and must not be represented as confirmed inventory, real reviews, or completed sales.

## Cloudflare Pages note

A standard Next.js App Router app with server-rendered routes, API routes, authentication, and payment webhooks is not a plain static site. Use Cloudflare's supported Next.js deployment path (currently Workers with the OpenNext adapter) for the full application; static Pages export would not support the required server-side features. Configure environment variables and run production smoke tests after deployment.

## Planned milestones

1. Storefront, product pages, cart, wishlist, WhatsApp order handoff.
2. Cloudflare D1 schema, vendor authentication, isolated dashboard, persistent orders and R2 image storage.
3. Paystack initialization, verification, signed webhooks, idempotency.
4. Tests, security hardening, setup/deployment documentation.

## WhatsApp configuration

Set `NEXT_PUBLIC_DEMO_WHATSAPP_NUMBER` to the verified store WhatsApp number in international format using digits only (for example, a Nigerian number starts with `234`, without the local leading `0`). The cart prepares an encoded click-to-chat message; the customer must review and manually send it in WhatsApp. This prototype does not create a database order or record payment.