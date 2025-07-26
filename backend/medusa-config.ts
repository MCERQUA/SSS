import { defineConfig } from "@medusajs/framework/utils";

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001", 
      authCors: process.env.AUTH_CORS || "http://localhost:3000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: {
    fileService: {
      resolve: "@medusajs/file-local",
      options: {
        upload_dir: "uploads",
      },
    },
    paymentService: {
      resolve: "@medusajs/payment-stripe", 
      options: {
        api_key: process.env.STRIPE_API_KEY,
      },
    },
  }
});