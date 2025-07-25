import { StandardProduct } from '@/types/cart'

export const standardProducts: Omit<StandardProduct, 'quantity' | 'createdAt'>[] = [
  // Standard Apparel
  {
    id: 'custom-printed-tshirt',
    type: 'standard',
    name: 'Custom Printed T-Shirt',
    description: 'Premium quality custom printed t-shirt. Soft cotton blend with high-quality screen printing. Perfect for promotional use or personal wear.',
    price: 20.00,
    stripeProductId: 'prod_Sk9J3SP9G6DX9N', // Small - will be dynamic based on size
    stripePriceId: 'price_1Rof0vAsB00o6gkbKsJrcSxx',
    category: 'apparel',
    image: '/images/products/custom-printed-tshirt.jpg',
    sizes: [
      { name: 'S', price: 20.00, stripeProductId: 'prod_Sk9J3SP9G6DX9N', stripePriceId: 'price_1Rof0vAsB00o6gkbKsJrcSxx' },
      { name: 'M', price: 20.00, stripeProductId: 'prod_Sk9J5GfiIYKUf0', stripePriceId: 'price_1Rof0yAsB00o6gkbUSumMKZJ' },
      { name: 'L', price: 22.00, stripeProductId: 'prod_Sk9JPQClxwmyjJ', stripePriceId: 'price_1Rof12AsB00o6gkbJYkgKxnY' },
      { name: 'XL', price: 24.00, stripeProductId: 'prod_Sk9JpTe9VTr1KD', stripePriceId: 'price_1Rof15AsB00o6gkbufqgCq4l' },
      { name: 'XXL', price: 26.00, stripeProductId: 'prod_Sk9Jkw857p9rDe', stripePriceId: 'price_1Rof18AsB00o6gkbP6FRdXZJ' }
    ],
    colors: ['Black', 'White', 'Navy', 'Red']
  },
  {
    id: 'basic-tee-black',
    type: 'standard',
    name: 'Classic Black T-Shirt',
    description: 'Premium cotton t-shirt perfect for custom printing and NFC integration',
    price: 24.99,
    stripeProductId: 'prod_basic_tee', // You'll replace with real Stripe product IDs
    stripePriceId: 'price_basic_tee',
    category: 'apparel',
    image: '/images/products/basic-tee-black.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Red']
  },
  {
    id: 'hoodie-black',
    type: 'standard',
    name: 'Premium Hoodie',
    description: 'High-quality hoodie ideal for NFC-enabled merchandise',
    price: 54.99,
    stripeProductId: 'prod_hoodie',
    stripePriceId: 'price_hoodie',
    category: 'apparel',
    image: '/images/products/hoodie-black.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Navy', 'Red']
  },
  {
    id: 'polo-shirt',
    type: 'standard',
    name: 'Professional Polo Shirt',
    description: 'Business-ready polo perfect for corporate NFC merchandise',
    price: 34.99,
    stripeProductId: 'prod_polo',
    stripePriceId: 'price_polo',
    category: 'apparel',
    image: '/images/products/polo-black.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Red', 'Grey']
  },

  // Standard Decals
  {
    id: 'uv-dtf-small',
    type: 'standard',
    name: 'UV DTF Decal - Small',
    description: 'Weather-resistant decal up to 3" x 3"',
    price: 8.99,
    stripeProductId: 'prod_decal_small',
    stripePriceId: 'price_decal_small',
    category: 'decals',
    image: '/images/products/decal-small.jpg'
  },
  {
    id: 'uv-dtf-medium',
    type: 'standard',
    name: 'UV DTF Decal - Medium',
    description: 'Weather-resistant decal up to 6" x 6"',
    price: 15.99,
    stripeProductId: 'prod_decal_medium',
    stripePriceId: 'price_decal_medium',
    category: 'decals',
    image: '/images/products/decal-medium.jpg'
  },
  {
    id: 'uv-dtf-large',
    type: 'standard',
    name: 'UV DTF Decal - Large',
    description: 'Weather-resistant decal up to 12" x 12"',
    price: 29.99,
    stripeProductId: 'prod_decal_large',
    stripePriceId: 'price_decal_large',
    category: 'decals',
    image: '/images/products/decal-large.jpg'
  },

  // Standard Accessories
  {
    id: 'nfc-sticker-pack',
    type: 'standard',
    name: 'NFC Sticker Pack (10-pack)',
    description: 'Pre-programmed NFC stickers ready for your custom links',
    price: 19.99,
    stripeProductId: 'prod_nfc_stickers',
    stripePriceId: 'price_nfc_stickers',
    category: 'accessories',
    image: '/images/products/nfc-stickers.jpg'
  },
  {
    id: 'business-card-nfc',
    type: 'standard',
    name: 'NFC Business Cards (50-pack)',
    description: 'Professional NFC-enabled business cards',
    price: 89.99,
    stripeProductId: 'prod_nfc_cards',
    stripePriceId: 'price_nfc_cards',
    category: 'accessories',
    image: '/images/products/nfc-business-cards.jpg'
  }
]

// Custom quote templates for common requests
export const customQuoteTemplates = [
  {
    id: 'nfc-apparel-custom',
    name: 'Custom NFC Apparel',
    description: 'Custom designed apparel with integrated NFC technology',
    category: 'nfc_apparel' as const,
    basePrice: 45.00,
    image: '/images/services/nfc-apparel.jpg'
  },
  {
    id: 'bulk-decals',
    name: 'Bulk UV DTF Decals',
    description: 'Large quantity custom decals for events or promotions',
    category: 'bulk_order' as const,
    basePrice: 3.50,
    image: '/images/services/bulk-decals.jpg'
  },
  {
    id: 'custom-design',
    name: 'Custom Design Project',
    description: 'Fully custom merchandise with your unique design requirements',
    category: 'special_project' as const,
    basePrice: 75.00,
    image: '/images/services/custom-design.jpg'
  },
  {
    id: 'vehicle-decals',
    name: 'Vehicle Decal Package',
    description: 'Custom vehicle wraps and decals for business promotion',
    category: 'custom_decals' as const,
    basePrice: 150.00,
    image: '/images/services/vehicle-decals.jpg'
  }
]