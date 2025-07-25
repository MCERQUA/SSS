'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CustomQuoteItem } from '@/types/cart'
import { useCart } from '@/lib/medusa/cart-context'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface CustomQuoteTemplate {
  id: string
  name: string
  description: string
  category: 'nfc_apparel' | 'bulk_order' | 'special_project' | 'custom_decals'
  basePrice: number
  image: string
}

interface CustomQuoteCardProps {
  template: CustomQuoteTemplate
}

export function CustomQuoteCard({ template }: CustomQuoteCardProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showCustomForm, setShowCustomForm] = useState(false)
  
  // Basic customization state
  const [customizations, setCustomizations] = useState({
    nfcEnabled: template.category === 'nfc_apparel',
    designDescription: '',
    specialInstructions: '',
    urgency: 'standard' as 'standard' | 'rush' | 'emergency',
    estimatedQuantity: quantity
  })

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    try {
      // For now, redirect to contact form with pre-filled info
      const params = new URLSearchParams({
        subject: `Custom Quote Request: ${template.name}`,
        message: `I'd like a quote for: ${template.name}\nQuantity: ${quantity}\nDescription: ${template.description}\nDesign details: ${customizations.designDescription || 'To be discussed'}`
      })
      
      window.location.href = `/contact?${params.toString()}`
    } catch (error) {
      console.error('Error processing quote request:', error)
      alert('Error processing request. Please try again.')
    }
    
    // Brief loading state for user feedback
    setTimeout(() => {
      setIsAdding(false)
      setShowCustomForm(false)
    }, 500)
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'nfc_apparel':
        return { label: 'NFC Apparel', color: 'bg-blue-100 text-blue-800', icon: '📱' }
      case 'bulk_order':
        return { label: 'Bulk Order', color: 'bg-green-100 text-green-800', icon: '📦' }
      case 'special_project':
        return { label: 'Special Project', color: 'bg-purple-100 text-purple-800', icon: '⭐' }
      case 'custom_decals':
        return { label: 'Custom Decals', color: 'bg-orange-100 text-orange-800', icon: '🎨' }
      default:
        return { label: 'Custom', color: 'bg-gray-100 text-gray-800', icon: '✨' }
    }
  }

  const categoryInfo = getCategoryInfo(template.category)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-100">
      {/* Template Image */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        {template.image ? (
          <Image
            src={template.image}
            alt={template.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">{categoryInfo.icon}</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", categoryInfo.color)}>
            {categoryInfo.label}
          </span>
        </div>

        {/* Quote Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
            Custom Quote
          </span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
        <p className="text-sm text-gray-700 line-clamp-2">{template.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">
              Starting at ${template.basePrice}
            </span>
            <p className="text-xs text-gray-500">Final pricing after consultation</p>
          </div>
          <span className="text-sm text-blue-600 font-medium">Quote Required</span>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-black">Estimated Quantity:</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                const newQty = Math.max(1, quantity - 1)
                setQuantity(newQty)
                setCustomizations(prev => ({ ...prev, estimatedQuantity: newQty }))
              }}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => {
                const newQty = quantity + 1
                setQuantity(newQty)
                setCustomizations(prev => ({ ...prev, estimatedQuantity: newQty }))
              }}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Customization Form */}
        {showCustomForm && (
          <div className="space-y-3 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900">Quick Details</h4>
            
            {template.category === 'nfc_apparel' && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="nfc-enabled"
                  checked={customizations.nfcEnabled}
                  onChange={(e) => setCustomizations(prev => ({ 
                    ...prev, 
                    nfcEnabled: e.target.checked 
                  }))}
                  className="rounded"
                />
                <label htmlFor="nfc-enabled" className="text-sm text-black">
                  Include NFC Programming
                </label>
              </div>
            )}
            
            <div>
              <label className="text-xs text-gray-700">Design Requirements:</label>
              <textarea
                value={customizations.designDescription}
                onChange={(e) => setCustomizations(prev => ({ 
                  ...prev, 
                  designDescription: e.target.value 
                }))}
                placeholder="Describe your design needs..."
                className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>
            
            <div>
              <label className="text-xs text-gray-700">Timeline:</label>
              <select
                value={customizations.urgency}
                onChange={(e) => setCustomizations(prev => ({ 
                  ...prev, 
                  urgency: e.target.value as 'standard' | 'rush' | 'emergency'
                }))}
                className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="standard">Standard (2-3 weeks)</option>
                <option value="rush">Rush (1 week)</option>
                <option value="emergency">Emergency (3-5 days)</option>
              </select>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="space-y-2">
        {!showCustomForm ? (
          <>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setShowCustomForm(true)}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Add Details
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleAddToCart}
              disabled={isAdding}
              className="shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700"
            >
              {isAdding ? (
                <span className="flex items-center space-x-2">
                  <span className="animate-spin">⟳</span>
                  <span>Adding...</span>
                </span>
              ) : (
                `Request Quote • Est. $${(template.basePrice * quantity).toFixed(2)}`
              )}
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleAddToCart}
            disabled={isAdding}
            className="shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700"
          >
            {isAdding ? (
              <span className="flex items-center space-x-2">
                <span className="animate-spin">⟳</span>
                <span>Adding...</span>
              </span>
            ) : (
              `Add to Quote Request • Est. $${(template.basePrice * quantity).toFixed(2)}`
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}