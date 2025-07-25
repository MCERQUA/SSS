"use client"

import React, { useState } from "react"
import { useCart } from "@/lib/medusa/cart-context"
import { medusaClient } from "@/lib/medusa/client"
import Image from "next/image"
import { ShoppingCart, Heart, Star } from "lucide-react"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

interface Product {
  id: string
  title: string
  description?: string
  thumbnail?: string
  images?: Array<{
    url: string
  }>
  variants?: Array<{
    id: string
    title: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }>
  collection?: {
    title: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const { addToCart } = useCart()

  // For now, we'll show a placeholder since we don't have real product data
  // In a real implementation, you would fetch the product using the ID
  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await medusaClient.products.retrieve(params.id)
        setProduct(response.product as any)
      } catch (err) {
        setError("Product not found")
        // For demo purposes, show a placeholder product
        setProduct({
          id: params.id,
          title: "Sample Product",
          description: "This is a sample product. To see real products, connect your Medusa backend and add products through the admin panel.",
          thumbnail: "/placeholder-product.jpg",
          variants: [{
            id: "variant-1",
            title: "Default",
            prices: [{
              amount: 2999,
              currency_code: "usd"
            }]
          }]
        })
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    if (!product?.variants?.[selectedVariant]) return
    
    setIsLoading(true)
    try {
      await addToCart(product.variants[selectedVariant].id, quantity)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading product...</div>
      </div>
    )
  }

  const currentVariant = product.variants?.[selectedVariant]
  const price = currentVariant?.prices?.[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <ShoppingCart size={64} className="mx-auto mb-2 text-gray-300" />
                  <p>No Image Available</p>
                </div>
              </div>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={image.url}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {product.collection && (
              <p className="text-sm text-gray-600 mb-2">{product.collection.title}</p>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            
            {price && (
              <p className="text-2xl font-semibold text-gray-900 mt-2">
                ${(price.amount / 100).toFixed(2)} {price.currency_code.toUpperCase()}
              </p>
            )}

            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8) 24 reviews</span>
            </div>
          </div>

          {product.description && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Variant Selection */}
          {product.variants && product.variants.length > 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Options</h3>
              <div className="space-y-2">
                {product.variants.map((variant, index) => (
                  <label key={variant.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="variant"
                      checked={selectedVariant === index}
                      onChange={() => setSelectedVariant(index)}
                      className="text-blue-600"
                    />
                    <span>{variant.title}</span>
                    <span className="text-sm text-gray-600">
                      ${(variant.prices[0]?.amount / 100).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Demo Mode:</strong> This is a placeholder product. Connect your Medusa backend to see real products.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}