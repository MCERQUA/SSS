import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    // For now, return static sample data since we need proper Medusa service integration
    const sampleProducts = [
      {
        id: "prod_01",
        title: "Premium T-Shirt",
        description: "A comfortable and stylish premium t-shirt made from 100% organic cotton.",
        handle: "premium-t-shirt",
        variants: [
          { id: "var_01", title: "Small", price: 29.99 },
          { id: "var_02", title: "Medium", price: 29.99 },
          { id: "var_03", title: "Large", price: 29.99 }
        ]
      },
      {
        id: "prod_02", 
        title: "Classic Jeans",
        description: "Durable and comfortable classic jeans perfect for everyday wear.",
        handle: "classic-jeans",
        variants: [
          { id: "var_04", title: "30x32", price: 79.99 },
          { id: "var_05", title: "32x32", price: 79.99 },
          { id: "var_06", title: "34x32", price: 79.99 }
        ]
      },
      {
        id: "prod_03",
        title: "Wireless Headphones", 
        description: "High-quality wireless headphones with noise cancellation and long battery life.",
        handle: "wireless-headphones",
        variants: [
          { id: "var_07", title: "Black", price: 159.99 },
          { id: "var_08", title: "White", price: 159.99 }
        ]
      }
    ]

    res.json({
      products: sampleProducts,
      count: sampleProducts.length,
      message: "Sample products from database schema"
    })
    
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products",
      details: error instanceof Error ? error.message : "Unknown error"
    })
  }
}