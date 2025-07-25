'use client'

import React, { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getStandardItems, 
    getCustomItems,
    canCheckout 
  } = useCart()

  const standardItems = getStandardItems()
  const customItems = getCustomItems()

  const handleCheckout = async () => {
    if (standardItems.length > 0) {
      // Handle Stripe checkout for standard items
      try {
        const response = await fetch('/api/checkout/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: standardItems })
        })
        
        if (response.ok) {
          const { url } = await response.json()
          window.location.href = url
        }
      } catch (error) {
        console.error('Checkout error:', error)
      }
    }

    if (customItems.length > 0) {
      // Handle custom quote request
      // We'll implement this next
      console.log('Processing custom quote request...', customItems)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 mt-2">Add some amazing products!</p>
              </div>
            ) : (
              <>
                {/* Standard Products */}
                {standardItems.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">
                      Ready to Purchase (${cart.standardTotal.toFixed(2)})
                    </h3>
                    {standardItems.map((item) => (
                      <Card key={item.id} className="p-4 mb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            {item.selectedSize && (
                              <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && (
                              <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                            )}
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                              >
                                −
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 text-sm hover:text-red-700 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Custom Quote Items */}
                {customItems.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">
                      Custom Quote Requests 
                      {cart.estimatedCustomTotal > 0 && ` (Est. $${cart.estimatedCustomTotal.toFixed(2)})`}
                    </h3>
                    {customItems.map((item) => (
                      <Card key={item.id} className="p-4 mb-3 border-blue-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <div className="mt-2 text-xs text-gray-500">
                              <p>Category: {item.category.replace('_', ' ')}</p>
                              {item.customizations.nfcEnabled && <p>✓ NFC Enabled</p>}
                              {item.customizations.designDescription && (
                                <p>Design: {item.customizations.designDescription}</p>
                              )}
                            </div>
                            <div className="flex items-center mt-2 space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                              >
                                −
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            {item.basePrice ? (
                              <p className="font-semibold">
                                Est. ${(item.basePrice * item.quantity).toFixed(2)}
                              </p>
                            ) : (
                              <p className="text-blue-600 font-medium">Quote Required</p>
                            )}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 text-sm hover:text-red-700 mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-3 mb-4">
                {cart.standardTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Immediate Purchase:</span>
                    <span className="font-semibold">${cart.standardTotal.toFixed(2)}</span>
                  </div>
                )}
                {cart.estimatedCustomTotal > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Est. Custom Items:</span>
                    <span>${cart.estimatedCustomTotal.toFixed(2)}</span>
                  </div>
                )}
                {customItems.some(item => !item.basePrice) && (
                  <p className="text-xs text-gray-500">
                    * Some items require custom quotes
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={!canCheckout()}
                >
                  {standardItems.length > 0 && customItems.length > 0
                    ? 'Purchase + Request Quotes'
                    : standardItems.length > 0
                    ? 'Checkout Now'
                    : 'Request Quotes'
                  }
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}