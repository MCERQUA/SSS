import { medusaClient } from "@/lib/medusa/client"
import { ProductCard } from "@/components/products/product-card"

export default async function ProductsPage() {
  let products: any[] = []
  
  try {
    const response = await medusaClient.products.list()
    products = response.products || []
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available yet.</p>
          <p className="text-gray-500 mt-2">Check back later or start the Medusa backend to see products.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}