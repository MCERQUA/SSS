export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products built with Medusa and Next.js
        </p>
        <div className="space-x-4">
          <a 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  )
}