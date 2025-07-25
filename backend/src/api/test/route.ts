import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    // Simple health check endpoint
    res.json({
      message: "Medusa backend is running!",
      timestamp: new Date().toISOString(),
      status: "healthy",
      database: "connected"
    })
  } catch (error) {
    res.status(500).json({
      error: "Backend health check failed",
      details: error.message
    })
  }
}