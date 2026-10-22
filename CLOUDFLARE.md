# Cloudflare deployment guide

This application uses Next.js App Router and needs a server-capable runtime. Deploy it as a **Cloudflare Worker**, using the OpenNext Cloudflare adapter, not as a static-only Pages export.

## Connect GitHub to Workers Builds

1. Open the Cloudflare dashboard and choose **Workers & Pages**.
2. Choose **Create application** and select **Workers** / **Import a repository** (the wording can vary by dashboard version).
3. Connect the GitHub account and select `bellascotman-jpg/2025Hub-store`.
4. Use the repository root as the project directory.
5. Set the build command to `npm run cf:build` if a build command is requested. The Worker entry point is `.open-next/worker.js`, with static assets in `.open-next/assets`.
6. Trigger a deployment and open its build log. The build must complete successfully before a preview URL appears.
7. Open the Worker in **Workers & Pages → 2025hub-store → Deployments**. Select the latest successful deployment and open its `workers.dev` URL.

## Preview deployments

A preview URL is not guaranteed merely because the repository is connected. A successful deployment is required. For branch previews, enable non-production branch builds / preview deployments in Workers Builds if that option is available in your account. Cloudflare will show the URL on the deployment details page and may report it back to the GitHub commit or pull request.

## If the dashboard shows no preview

- Open **Deployments** and inspect the latest deployment status.
- If it failed, open **Build logs** and read the first actual error; do not repeatedly redeploy without fixing it.
- Confirm the production branch is `main`.
- Confirm the build uses the repository root, not a subfolder.
- Confirm the project is a Worker using the configured entry point, not a Pages static export looking for an `out` folder.
- Check that GitHub is connected to the correct repository and that the latest commit appears in deployment history.

## Local Worker preview

With Node.js 22 installed:

```bash
npm install
npm run cf:preview
```

This builds the app and starts the generated Worker locally. To deploy from a local terminal after authenticating Wrangler:

```bash
npx wrangler login
npm run cf:deploy
```

## Store contact configuration

The landing page and store page show a WhatsApp button only when the number is configured. In Workers Builds, open the project's Settings → Variables and Secrets (or build configuration variables, depending on the dashboard) and add:

- Name: NEXT_PUBLIC_DEMO_WHATSAPP_NUMBER
- Value: the store's verified WhatsApp number in international digits-only format. A Nigerian number begins with 234 and omits the leading 0 and +.

Because this NEXT_PUBLIC_ variable is used by client-side code, it must be available to the build process. Trigger a fresh build after adding or changing it. Never place a private payment secret in a NEXT_PUBLIC_ variable.

## Database groundwork

The first D1 schema draft is in migrations/0001_store_schema.sql. It is not live until a D1 database is created, the database ID is configured as a binding in wrangler.jsonc, and the migration is applied. Do not put a made-up database ID in the configuration.

## Current feature status

The storefront includes sample product cards, search, category filters, sorting, product detail pages, local cart and wishlist, and a checkout enquiry form that prepares customer and item details for WhatsApp. Sample products, prices, and Unsplash images are illustrative. The checkout does not yet persist orders in D1 or accept payments. Vendor authentication/dashboard and verified Paystack payments remain future milestones. Do not collect real payments until those systems and their security tests are complete.
