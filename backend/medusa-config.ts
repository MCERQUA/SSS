module.exports = {
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "*",
      adminCors: process.env.ADMIN_CORS || "*", 
      authCors: process.env.AUTH_CORS || "*",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    admin: {
      disable: true,
    },
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
};