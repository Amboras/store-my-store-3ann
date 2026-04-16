'use client'

import { useState, useEffect } from 'react'
import { Zap, Package, Clock, ShieldCheck, BadgeCheck, Truck } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleOfferProps {
  variantId: string
  productTitle: string
  singlePrice: number | null
  currency: string
}

function formatPrice(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set a daily deal ending at midnight
    const updateTimer = () => {
      const now = new Date()
      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)
      const diff = endOfDay.getTime() - now.getTime()

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const id = setInterval(updateTimer, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1.5 font-mono text-sm font-bold tabular-nums">
      <div className="bg-foreground text-background px-2 py-0.5 rounded text-xs">
        {pad(timeLeft.hours)}h
      </div>
      <span className="text-muted-foreground text-xs">:</span>
      <div className="bg-foreground text-background px-2 py-0.5 rounded text-xs">
        {pad(timeLeft.minutes)}m
      </div>
      <span className="text-muted-foreground text-xs">:</span>
      <div className="bg-foreground text-background px-2 py-0.5 rounded text-xs">
        {pad(timeLeft.seconds)}s
      </div>
    </div>
  )
}

export default function BundleOffer({ variantId, productTitle, singlePrice, currency }: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [selected, setSelected] = useState<'single' | 'double' | 'triple'>('single')

  const bundleOptions = [
    {
      key: 'single' as const,
      label: '1 Unit',
      qty: 1,
      discount: 0,
      badge: null,
    },
    {
      key: 'double' as const,
      label: '2 Units',
      qty: 2,
      discount: 10,
      badge: 'Most Popular',
    },
    {
      key: 'triple' as const,
      label: '3 Units',
      qty: 3,
      discount: 20,
      badge: 'Best Value',
    },
  ]

  const selectedOption = bundleOptions.find((o) => o.key === selected)!

  const discountedPrice = singlePrice
    ? Math.round(singlePrice * selectedOption.qty * (1 - selectedOption.discount / 100))
    : null

  const originalPrice = singlePrice ? singlePrice * selectedOption.qty : null

  const handleAddBundle = () => {
    if (!variantId) return
    addItem(
      { variantId, quantity: selectedOption.qty },
      {
        onSuccess: () => {
          toast.success(
            selectedOption.qty === 1
              ? `${productTitle} added to bag`
              : `${selectedOption.qty}x ${productTitle} added to bag`
          )
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add to bag')
        },
      }
    )
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500/8 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold">Bundle & Save</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-xs text-muted-foreground mr-1">Deal ends in</span>
          <CountdownTimer />
        </div>
      </div>

      {/* Bundle options */}
      <div className="p-4 space-y-2.5">
        {bundleOptions.map((option) => {
          const optPrice = singlePrice
            ? Math.round(singlePrice * option.qty * (1 - option.discount / 100))
            : null
          const optOriginal = singlePrice ? singlePrice * option.qty : null
          const isSelected = selected === option.key

          return (
            <button
              key={option.key}
              onClick={() => setSelected(option.key)}
              className={`w-full flex items-center gap-3 rounded-md border p-3 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500'
                  : 'border-border hover:border-muted-foreground/40'
              }`}
            >
              {/* Radio */}
              <div
                className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isSelected ? 'border-blue-500' : 'border-muted-foreground/40'
                }`}
              >
                {isSelected && <div className="h-2 w-2 rounded-full bg-blue-500" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold">{option.label}</span>
                  {option.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white px-2 py-0.5 rounded-full">
                      {option.badge}
                    </span>
                  )}
                  {option.discount > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-green-500/15 text-green-600 px-2 py-0.5 rounded-full">
                      Save {option.discount}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                {optPrice !== null && (
                  <p className="text-sm font-bold">{formatPrice(optPrice, currency)}</p>
                )}
                {optOriginal !== null && option.discount > 0 && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(optOriginal, currency)}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 space-y-3">
        <button
          onClick={handleAddBundle}
          disabled={isAddingItem || !variantId}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors rounded-sm"
        >
          <Zap className="h-4 w-4" />
          {selectedOption.qty === 1
            ? 'Add to Bag'
            : `Add ${selectedOption.qty} to Bag — ${discountedPrice ? formatPrice(discountedPrice, currency) : ''}`}
        </button>

        {/* Mini trust */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
            2-Year Warranty
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Truck className="h-3.5 w-3.5 text-blue-500" />
            Free Shipping
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
            Genuine Product
          </span>
        </div>
      </div>
    </div>
  )
}
