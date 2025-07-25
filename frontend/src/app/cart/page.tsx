"use client"

import { useCart } from "@/lib/medusa/cart-context"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, isLoading } = useCart()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          <p className="text-gray-600">Your cart is empty</p>
          <a 
            href="/products" 
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item: any) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 relative bg-gray-100 rounded-md">
                  {item.product.thumbnail ? (
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.title}</h3>
                  <p className="text-gray-600 text-sm">{item.variant.title}</p>
                  <p className="text-lg font-bold">
                    ${(item.variant.prices[0]?.amount / 100).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(cart.subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(cart.total / 100).toFixed(2)}</span>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}