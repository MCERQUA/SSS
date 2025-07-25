'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Cart, CartItem, StandardProduct, CustomQuoteItem } from '@/types/cart'

interface CartState extends Cart {}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_CUSTOMIZATIONS'; payload: { id: string; customizations: any } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }

interface CartContextType {
  cart: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateCustomizations: (id: string, customizations: any) => void
  clearCart: () => void
  getStandardItems: () => StandardProduct[]
  getCustomItems: () => CustomQuoteItem[]
  getTotalItems: () => number
  canCheckout: () => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialCart: CartState = {
  items: [],
  totalStandardItems: 0,
  totalCustomItems: 0,
  standardTotal: 0,
  estimatedCustomTotal: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}

function calculateTotals(items: CartItem[]): Omit<CartState, 'items' | 'createdAt'> {
  const standardItems = items.filter((item): item is StandardProduct => item.type === 'standard')
  const customItems = items.filter((item): item is CustomQuoteItem => item.type === 'custom_quote')
  
  const totalStandardItems = standardItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalCustomItems = customItems.reduce((sum, item) => sum + item.quantity, 0)
  
  const standardTotal = standardItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const estimatedCustomTotal = customItems.reduce((sum, item) => 
    sum + ((item.basePrice || 0) * item.quantity), 0
  )
  
  return {
    totalStandardItems,
    totalCustomItems,
    standardTotal,
    estimatedCustomTotal,
    updatedAt: new Date()
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      
      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, action.payload]
      }
      
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id })
      }
      
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      }
    }
    
    case 'UPDATE_CUSTOMIZATIONS': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id && item.type === 'custom_quote'
          ? { ...item, customizations: { ...item.customizations, ...action.payload.customizations } }
          : item
      )
      
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems)
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...initialCart,
        createdAt: state.createdAt
      }
    
    case 'LOAD_CART':
      return action.payload
    
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sweatshop-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Convert date strings back to Date objects
        parsedCart.createdAt = new Date(parsedCart.createdAt)
        parsedCart.updatedAt = new Date(parsedCart.updatedAt)
        parsedCart.items = parsedCart.items.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }))
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweatshop-cart', JSON.stringify(cart))
  }, [cart])
  
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }
  
  const updateCustomizations = (id: string, customizations: any) => {
    dispatch({ type: 'UPDATE_CUSTOMIZATIONS', payload: { id, customizations } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const getStandardItems = (): StandardProduct[] => {
    return cart.items.filter((item): item is StandardProduct => item.type === 'standard')
  }
  
  const getCustomItems = (): CustomQuoteItem[] => {
    return cart.items.filter((item): item is CustomQuoteItem => item.type === 'custom_quote')
  }
  
  const getTotalItems = (): number => {
    return cart.totalStandardItems + cart.totalCustomItems
  }
  
  const canCheckout = (): boolean => {
    return cart.items.length > 0
  }
  
  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    updateCustomizations,
    clearCart,
    getStandardItems,
    getCustomItems,
    getTotalItems,
    canCheckout
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}