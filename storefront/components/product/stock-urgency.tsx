'use client'

import { Flame, Users } from 'lucide-react'

interface StockUrgencyProps {
  inStock?: boolean
}

export default function StockUrgency({ inStock = true }: StockUrgencyProps) {
  if (!inStock) return null

  // Deterministic "low stock" display — shows urgency without real inventory
  const stockLeft = 7
  const watching = 43

  return (
    <div className="space-y-2">
      {/* Stock bar */}
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-orange-500">
          <Flame className="h-3.5 w-3.5" />
          Only {stockLeft} left in stock
        </span>
        <span className="text-muted-foreground">Selling fast</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all"
          style={{ width: `${100 - (stockLeft / 30) * 100}%` }}
        />
      </div>
      {/* Viewers */}
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="h-3.5 w-3.5 text-blue-500" />
        <span className="font-semibold text-foreground">{watching} people</span> are viewing this right now
      </p>
    </div>
  )
}
