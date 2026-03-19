"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, CheckIcon } from '../icons'

interface CheckoutScreenProps {
  onBack?: () => void
  onComplete?: () => void
}

const CART_ITEMS = [
  {
    id: '1',
    name: 'Zellige Table',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=200&h=200&fit=crop',
    artisan: 'Fatima Zahra',
    artisanPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Leather Pouf',
    price: 890,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
    artisan: 'Hassan B.',
    artisanPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    quantity: 2,
  },
]

const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 150, days: '7-14 days' },
  { id: 'express', name: 'Express Shipping', price: 350, days: '3-5 days' },
  { id: 'premium', name: 'Premium Shipping', price: 600, days: '1-2 days' },
]

export function CheckoutScreen({ onBack, onComplete }: CheckoutScreenProps) {
  const [selectedShipping, setSelectedShipping] = useState('standard')

  const subtotal = CART_ITEMS.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingCost = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 0
  const platformFee = Math.round(subtotal * 0.15) // 15% platform fee
  const artisanEarnings = subtotal - platformFee
  const total = subtotal + shippingCost

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 flex items-center gap-3 border-b border-border bg-card">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Checkout</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Cart items */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">ORDER SUMMARY</h2>
          <div className="space-y-3">
            {CART_ITEMS.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-card rounded-2xl border border-border">
                <div 
                  className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-primary font-bold mt-1">{item.price * item.quantity} MAD</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artisan commission info */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">ARTISAN SUPPORT</h2>
          <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <svg className="w-5 h-5 text-secondary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Supporting Local Artisans</p>
                <p className="text-sm text-muted-foreground">85% of your purchase goes directly to the maker</p>
              </div>
            </div>
            
            {/* Commission breakdown */}
            <div className="space-y-2 pt-3 border-t border-secondary/30">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Artisan receives</span>
                <span className="font-semibold text-secondary">{artisanEarnings} MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform fee (15%)</span>
                <span className="text-muted-foreground">{platformFee} MAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping options */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">SHIPPING</h2>
          <div className="space-y-2">
            {SHIPPING_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedShipping(option.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                  selectedShipping === option.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    selectedShipping === option.id ? "border-accent bg-accent" : "border-muted-foreground"
                  )}>
                    {selectedShipping === option.id && (
                      <CheckIcon className="w-3 h-3 text-accent-foreground" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{option.name}</p>
                    <p className="text-sm text-muted-foreground">{option.days}</p>
                  </div>
                </div>
                <span className="font-semibold text-foreground">{option.price} MAD</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">TOTAL</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{subtotal} MAD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">{shippingCost} MAD</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">{total} MAD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-colors mb-3"
        >
          Pay {total} MAD
        </button>
        
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-[#000000] text-white rounded-xl font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.0508 13.6963C17.0274 11.2283 18.9903 10.0351 19.0879 9.97363C17.9512 8.27148 16.1836 8.04297 15.5576 8.01855C14.0576 7.86816 12.6035 8.91211 11.8418 8.91211C11.0644 8.91211 9.87305 8.03418 8.60449 8.06543C6.96973 8.09668 5.44434 9.02441 4.60254 10.5244C2.86816 13.5771 4.16309 18.1084 5.82129 20.5781C6.65039 21.7871 7.62598 23.1396 8.89355 23.0869C10.1279 23.0293 10.5986 22.2803 12.0752 22.2803C13.5361 22.2803 13.9746 23.0869 15.2754 23.0498C16.6162 23.0293 17.4551 21.8496 18.2471 20.626C19.2031 19.2217 19.5869 17.8564 19.6035 17.7842C19.5684 17.7715 17.0781 16.7861 17.0508 13.6963Z"/>
              <path d="M14.6797 6.50098C15.3486 5.67773 15.8096 4.55957 15.6826 3.42188C14.7119 3.46387 13.5283 4.08398 12.8262 4.8916C12.2051 5.60449 11.6465 6.77051 11.791 7.86133C12.8799 7.9375 14.0049 7.30762 14.6797 6.50098Z"/>
            </svg>
            Apple Pay
          </button>
          <button className="flex-1 py-3 bg-[#4285F4] text-white rounded-xl font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.5 12.2271C22.5 11.5182 22.4363 10.8364 22.3182 10.1818H12V14.05H17.8818C17.65 15.3 16.9454 16.3591 15.8863 17.0682V19.5773H19.3182C21.4409 17.6364 22.5 14.7273 22.5 12.2271Z" fill="#4285F4"/>
              <path d="M12 22C14.7 22 16.9636 21.1045 19.3182 19.5773L15.8864 17.0682C14.9909 17.6682 13.8455 18.0227 12 18.0227C9.39545 18.0227 7.19091 16.0636 6.40455 13.5H2.86364V16.0909C4.72727 19.7818 8.09091 22 12 22Z" fill="#34A853"/>
              <path d="M6.40455 13.5C6.20455 12.9 6.09091 12.2591 6.09091 11.6C6.09091 10.9409 6.20455 10.3 6.40455 9.7V7.10909H2.86364C2.18182 8.45909 1.77273 9.98182 1.77273 11.6C1.77273 13.2182 2.18182 14.7409 2.86364 16.0909L6.40455 13.5Z" fill="#FBBC05"/>
              <path d="M12 5.17727C13.7636 5.17727 15.3364 5.77727 16.5909 6.94545L19.2 4.33636C16.9636 2.24545 14.7 1.2 12 1.2C8.09091 1.2 4.72727 3.41818 2.86364 7.10909L6.40455 9.7C7.19091 7.13636 9.39545 5.17727 12 5.17727Z" fill="#EA4335"/>
            </svg>
            Google Pay
          </button>
        </div>
      </div>
    </div>
  )
}
