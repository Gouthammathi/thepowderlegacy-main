import React from 'react'
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

function StockIndicator({ stock, size }) {
  const getStockStatus = () => {
    if (stock === 0) {
      return {
        status: 'out',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: <AlertTriangle size={16} />,
        text: 'Out of Stock',
        description: 'This size is currently unavailable'
      }
    } else if (stock <= 5) {
      return {
        status: 'low',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: <Clock size={16} />,
        text: 'Low Stock',
        description: `Only ${stock} left in stock`
      }
    } else if (stock <= 15) {
      return {
        status: 'medium',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        icon: <Package size={16} />,
        text: 'Limited Stock',
        description: `${stock} available`
      }
    } else {
      return {
        status: 'good',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: <CheckCircle size={16} />,
        text: 'In Stock',
        description: `${stock} available`
      }
    }
  }

  const stockInfo = getStockStatus()

  return (
    <div className={`${stockInfo.bgColor} ${stockInfo.borderColor} border rounded-lg p-3 mb-4`}>
      <div className="flex items-center gap-2 mb-1">
        <div className={stockInfo.color}>
          {stockInfo.icon}
        </div>
        <span className={`font-semibold text-sm ${stockInfo.color}`}>
          {stockInfo.text}
        </span>
      </div>
      <p className={`text-xs ${stockInfo.color} opacity-80`}>
        {stockInfo.description}
      </p>
      
      {stockInfo.status === 'low' && (
        <div className="mt-2 text-xs text-orange-700 font-medium">
          ⚡ Order soon to secure your size!
        </div>
      )}
      
      {stockInfo.status === 'out' && (
        <div className="mt-2 text-xs text-red-700">
          📧 Notify me when back in stock
        </div>
      )}
    </div>
  )
}

export default StockIndicator

