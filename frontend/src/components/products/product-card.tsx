"use client"

import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  description?: string
  thumbnail?: string
  variants?: Array<{
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }>
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.variants?.[0]?.prices?.[0]
  
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative bg-gray-100">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          
          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          {price && (
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${(price.amount / 100).toFixed(2)} {price.currency_code.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}