'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/medusa/cart-context'
import { CartDrawer } from './CartDrawer'
import { cn } from '@/lib/utils'

interface CartIconProps {
  className?: string
  isScrolled?: boolean
}

export function CartIcon({ className, isScrolled = false }: CartIconProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { cart } = useCart()
  
  const totalItems = cart?.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0

  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className={cn(
          "relative p-2 rounded-lg transition-colors",
          isScrolled 
            ? "text-white hover:bg-white/10" 
            : "text-white hover:bg-white/10",
          className
        )}
        aria-label={`Shopping cart with ${totalItems} items`}
      >
        {/* Shopping Cart Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
          />
        </svg>
        
        {/* Badge */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      <CartDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </>
  )
}