// Cloudflare Pages Function to handle all Medusa routes
export async function onRequest(context) {
  // Import your Medusa app
  const { createMedusaApp } = await import('../dist/index.js');
  
  const app = await createMedusaApp();
  
  return new Promise((resolve) => {
    app(context.request, resolve);
  });
}