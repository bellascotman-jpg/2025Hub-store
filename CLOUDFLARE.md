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

With Node.js 20.9+ installed:

```bash
npm install
npm run cf:preview
```

This builds the app and starts the generated Worker locally. To deploy from a local terminal after authenticating Wrangler:

```bash
npx wrangler login
npm run cf:deploy
```

## Current feature status

The initial release is a storefront prototype. Supabase authentication/database persistence, vendor dashboards, verified Paystack payments, and production order management are not implemented yet. Do not collect real payments until those systems and their security tests are complete.
