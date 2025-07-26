'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/medusa/cart-context'
import { useModal } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { openModal } = useModal()
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    isLoading
  } = useCart()

  const handleCheckout = async () => {
    // Open quote modal with cart items info
    const cartSummary = cart.items.length > 0 
      ? `Cart items:\n${cart.items.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n')}\n\nTotal: $${cart.total.toFixed(2)}`
      : 'I\'d like to request a quote for my cart items.'
    
    openModal('quote', {
      message: cartSummary
    })
    
    // Close cart drawer
    onClose()
  }

  return (
    <div className={cn("fixed inset-0 z-[60]", isOpen ? "block" : "hidden")}>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 z-[70]",
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
            {!cart || cart.items?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Your cart is empty</p>
                <p className="text-gray-500 mt-2">Add some amazing products!</p>
              </div>
            ) : (
              <>
                {cart.items?.map((item: any) => (
                  <Card key={item.id} className="p-4 mb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-black">
                          {item.product?.title || item.variant?.title || 'Product'}
                        </h4>
                        <p className="text-sm text-gray-700 mt-1">
                          {item.variant?.title || 'Variant'}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            disabled={isLoading}
                          >
                            −
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            disabled={isLoading}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="font-semibold">
                          ${((item.variant?.prices?.[0]?.amount || 0) * item.quantity / 100).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm hover:text-red-700 mt-1"
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          {cart && cart.items?.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold">
                    ${((cart.total || 0) / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  Request Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}