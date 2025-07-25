'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { StandardProduct } from '@/types/cart'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Omit<StandardProduct, 'quantity' | 'createdAt'>
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    const cartItem: StandardProduct = {
      ...product,
      quantity,
      selectedSize: product.sizes ? selectedSize : undefined,
      selectedColor: product.colors ? selectedColor : undefined,
      createdAt: new Date()
    }
    
    addItem(cartItem)
    
    // Brief loading state for user feedback
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-4xl">👕</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            product.category === 'apparel' && "bg-blue-100 text-blue-800",
            product.category === 'decals' && "bg-green-100 text-green-800",
            product.category === 'accessories' && "bg-purple-100 text-purple-800"
          )}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>

        {/* Quick Add Button - appears on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="accent"
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            {isAdding ? 'Adding...' : 'Quick Add'}
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">${product.price}</span>
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Size:</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md border transition-colors",
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Color:</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md border transition-colors",
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleAddToCart}
          disabled={isAdding}
          className="shadow-lg hover:shadow-xl"
        >
          {isAdding ? (
            <span className="flex items-center space-x-2">
              <span className="animate-spin">⟳</span>
              <span>Adding...</span>
            </span>
          ) : (
            `Add to Cart • $${(product.price * quantity).toFixed(2)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}