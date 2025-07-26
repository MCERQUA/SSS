const fs = require('fs');
const path = require('path');

// Create a simple wrapper for Cloudflare Pages Functions
const cfWrapper = `
import { createMedusaApp } from './dist/index.js';

export default {
  async fetch(request, env, ctx) {
    const app = await createMedusaApp({
      projectConfig: {
        databaseUrl: env.DATABASE_URL,
        http: {
          storeCors: env.STORE_CORS || 'http://localhost:3000',
          adminCors: env.ADMIN_CORS || 'http://localhost:3000',
          authCors: env.AUTH_CORS || 'http://localhost:3000',
          jwtSecret: env.JWT_SECRET,
          cookieSecret: env.COOKIE_SECRET,
        }
      },
      modules: [
        {
          resolve: "@medusajs/file-local",
          options: {
            upload_dir: "uploads",
          },
        },
        {
          resolve: "@medusajs/payment-stripe",
          options: {
            api_key: env.STRIPE_API_KEY,
          },
        },
      ]
    });
    
    return app.handle(request);
  }
};
`;

// Write the wrapper file
fs.writeFileSync(path.join(__dirname, 'functions', '_worker.js'), cfWrapper);

console.log('Cloudflare Pages build complete!');