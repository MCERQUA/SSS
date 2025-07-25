'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { StandardProduct, SizeVariant } from '@/types/cart'
import { useCart } from '@/lib/medusa/cart-context'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Omit<StandardProduct, 'quantity' | 'createdAt'>
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  
  // Handle both string[] and SizeVariant[] for sizes
  const sizeVariants = useMemo(() => {
    if (!product.sizes) return []
    return product.sizes.map(size => 
      typeof size === 'string' 
        ? { name: size, price: product.price, stripeProductId: product.stripeProductId, stripePriceId: product.stripePriceId }
        : size
    )
  }, [product.sizes, product.price, product.stripeProductId, product.stripePriceId])

  const [selectedSize, setSelectedSize] = useState<string>(sizeVariants[0]?.name || '')
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  // Get current price based on selected size
  const currentPrice = useMemo(() => {
    const selectedVariant = sizeVariants.find(size => size.name === selectedSize)
    return selectedVariant?.price || product.price
  }, [selectedSize, sizeVariants, product.price])

  // Get current Stripe IDs based on selected size
  const currentStripeIds = useMemo(() => {
    const selectedVariant = sizeVariants.find(size => size.name === selectedSize)
    return {
      productId: selectedVariant?.stripeProductId || product.stripeProductId,
      priceId: selectedVariant?.stripePriceId || product.stripePriceId
    }
  }, [selectedSize, sizeVariants, product.stripeProductId, product.stripePriceId])

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    try {
      // For now, just show alert - TODO: implement proper Medusa product integration
      alert(`Added ${product.name} to cart! (Feature coming soon - please contact us for orders)`)
      
      // Optionally try to add to Medusa cart if we have variant ID
      // await addToCart(variantId, quantity)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Error adding to cart. Please try again.')
    }
    
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
        <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">${currentPrice.toFixed(2)}</span>
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        </div>

        {/* Size Selection */}
        {sizeVariants && sizeVariants.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Size:</label>
            <div className="flex flex-wrap gap-2">
              {sizeVariants.map((sizeVariant) => (
                <button
                  key={sizeVariant.name}
                  onClick={() => setSelectedSize(sizeVariant.name)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md border transition-colors flex flex-col items-center",
                    selectedSize === sizeVariant.name
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-gray-400"
                  )}
                >
                  <span>{sizeVariant.name}</span>
                  {sizeVariant.price !== product.price && (
                    <span className="text-xs opacity-75">${sizeVariant.price.toFixed(2)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-black">Color:</label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md border transition-colors",
                    selectedColor === color
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-gray-400"
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
            `Add to Cart • $${(currentPrice * quantity).toFixed(2)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}