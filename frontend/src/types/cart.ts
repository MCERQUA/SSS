export interface BaseCartItem {
  id: string
  name: string
  description?: string
  image?: string
  quantity: number
  createdAt: Date
}

export interface SizeVariant {
  name: string
  price: number
  stripeProductId: string
  stripePriceId: string
}

export interface StandardProduct extends BaseCartItem {
  type: 'standard'
  price: number
  stripeProductId: string
  stripePriceId: string
  category: 'apparel' | 'decals' | 'accessories'
  sizes?: string[] | SizeVariant[]
  colors?: string[]
  selectedSize?: string
  selectedColor?: string
}

export interface CustomQuoteItem extends BaseCartItem {
  type: 'custom_quote'
  basePrice?: number // Optional starting estimate
  category: 'nfc_apparel' | 'custom_decals' | 'bulk_order' | 'special_project'
  customizations: {
    nfcEnabled?: boolean
    nfcProgramming?: string
    designUpload?: string
    designDescription?: string
    specialInstructions?: string
    urgency?: 'standard' | 'rush' | 'emergency'
    estimatedQuantity?: number
    sizes?: string[]
    colors?: string[]
    dimensions?: string
    material?: string
    finishes?: string[]
  }
}

export type CartItem = StandardProduct | CustomQuoteItem

export interface Cart {
  items: CartItem[]
  totalStandardItems: number
  totalCustomItems: number
  standardTotal: number
  estimatedCustomTotal: number
  createdAt: Date
  updatedAt: Date
}

export interface CheckoutSession {
  standardItems: StandardProduct[]
  customItems: CustomQuoteItem[]
  stripeSessionId?: string
  quoteRequestId?: string
}