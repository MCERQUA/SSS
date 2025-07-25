"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { medusaClient } from "./client"

interface CartItem {
  id: string
  quantity: number
  variant_id: string
  product: {
    id: string
    title: string
    thumbnail?: string
  }
  variant: {
    id: string
    title: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }
}

interface Cart {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
}

interface CartContextType {
  cart: any | null
  addToCart: (variantId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Initialize cart on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem("cart_id")
    if (storedCartId) {
      setCartId(storedCartId)
    } else {
      createCart()
    }
  }, [])

  // Create new cart
  const createCart = async () => {
    try {
      const { cart } = await medusaClient.carts.create()
      setCartId(cart.id)
      localStorage.setItem("cart_id", cart.id)
    } catch (error) {
      console.error("Failed to create cart:", error)
    }
  }

  // Get cart data
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null
      const { cart } = await medusaClient.carts.retrieve(cartId)
      return cart
    },
    enabled: !!cartId,
  })

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      if (!cartId) throw new Error("No cart available")
      const { cart } = await medusaClient.carts.lineItems.create(cartId, {
        variant_id: variantId,
        quantity,
      })
      return cart
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] })
    },
  })

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      if (!cartId) throw new Error("No cart available")
      const { cart } = await medusaClient.carts.lineItems.delete(cartId, itemId)
      return cart
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] })
    },
  })

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      if (!cartId) throw new Error("No cart available")
      const { cart } = await medusaClient.carts.lineItems.update(cartId, itemId, {
        quantity,
      })
      return cart
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] })
    },
  })

  const addToCart = async (variantId: string, quantity: number) => {
    await addToCartMutation.mutateAsync({ variantId, quantity })
  }

  const removeFromCart = async (itemId: string) => {
    await removeFromCartMutation.mutateAsync(itemId)
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    await updateQuantityMutation.mutateAsync({ itemId, quantity })
  }

  return (
    <CartContext.Provider
      value={{
        cart: cart || null,
        addToCart,
        removeFromCart,
        updateQuantity,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}