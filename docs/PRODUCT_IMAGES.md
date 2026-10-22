# 2025Hub product image workflow

## Temporary imagery
The current Unsplash URLs are design placeholders only. They do not represent confirmed 2025Hub inventory and should be replaced before the store is presented as a live catalogue.

## Add real product photos through GitHub on a phone
1. Open the repository on GitHub and enter the `public` folder.
2. Create a folder named `products` if it does not exist.
3. Choose **Add file → Upload files** and upload the seller-approved photos.
4. Use simple lowercase filenames such as `vintage-denim-01.jpg` and `black-shoulder-bag.jpg`.
5. In `lib/products.ts`, change the corresponding product's `image` field to a path such as `/products/vintage-denim-01.jpg`.
6. Commit the change. The CI workflow will typecheck, lint and build the app.

## Image rules
- Use photographs supplied by or authorized by the store owner.
- Keep the original item photo truthful: do not imply a stock photo is the item for sale.
- Use a clear main image with a plain background where possible; crop consistently.
- Use a useful `alt` description and compress oversized images before upload.
- For a production vendor dashboard, use Cloudflare R2 for uploads instead of committing every new product image to GitHub.
