'use client'

import React, { useState } from 'react'
import { standardProducts, customQuoteTemplates } from '@/data/products'
import { ProductCard } from './ProductCard'
import { CustomQuoteCard } from './CustomQuoteCard'
import { Button } from '@/components/ui/Button'

type CategoryFilter = 'all' | 'apparel' | 'decals' | 'accessories' | 'custom'

export function ProductsGrid() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')

  const filteredStandardProducts = activeFilter === 'all' || activeFilter === 'custom'
    ? standardProducts
    : standardProducts.filter(product => product.category === activeFilter)

  const showCustomQuotes = activeFilter === 'all' || activeFilter === 'custom'

  const filters: { key: CategoryFilter; label: string; count: number }[] = [
    { 
      key: 'all', 
      label: 'All Products', 
      count: standardProducts.length + customQuoteTemplates.length 
    },
    { 
      key: 'apparel', 
      label: 'Apparel', 
      count: standardProducts.filter(p => p.category === 'apparel').length 
    },
    { 
      key: 'decals', 
      label: 'Decals', 
      count: standardProducts.filter(p => p.category === 'decals').length 
    },
    { 
      key: 'accessories', 
      label: 'Accessories', 
      count: standardProducts.filter(p => p.category === 'accessories').length 
    },
    { 
      key: 'custom', 
      label: 'Custom Quotes', 
      count: customQuoteTemplates.length 
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">
          Products & Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our ready-to-ship standard products or request a custom quote 
          for specialized NFC merchandise and unique design projects.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter.key)}
            className="text-sm"
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-12">
        {/* Standard Products */}
        {filteredStandardProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">
                {activeFilter === 'all' ? 'Standard Products' : 
                 activeFilter === 'apparel' ? 'Apparel' :
                 activeFilter === 'decals' ? 'UV DTF Decals' :
                 activeFilter === 'accessories' ? 'Accessories' : 'Products'}
              </h2>
              <div className="text-sm text-green-600 font-medium">
                ✓ Available for immediate purchase
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStandardProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Custom Quote Templates */}
        {showCustomQuotes && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-black">
                Custom Quote Services
              </h2>
              <div className="text-sm text-blue-600 font-medium">
                ↗ Custom pricing & consultation
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customQuoteTemplates.map((template) => (
                <CustomQuoteCard 
                  key={template.id} 
                  template={template} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-black mb-4">
          Need Something Unique?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team specializes in creating custom NFC solutions and unique merchandise 
          that perfectly match your brand vision and business goals.
        </p>
        <Button 
          variant="primary" 
          size="lg"
          className="shadow-lg hover:shadow-xl"
        >
          Start Custom Project
        </Button>
      </div>
    </div>
  )
}