import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Star } from 'lucide-react'

function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    setRecentProducts(viewed.slice(0, 4)) // Show last 4 viewed products
  }, [])

  if (recentProducts.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-[#2d5f3f]" />
        <h3 className="text-lg font-bold text-gray-900">Recently Viewed</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <div key={product.id} className="group h-full flex flex-col bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out border border-gray-100">
            <Link to={`/shop/product/${product.id}`} className="block relative">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Eye size={20} />
                  </div>
                )}
              </div>
            </Link>
            
            <div className="p-3 flex flex-col h-full">
              <Link to={`/shop/product/${product.id}`}>
                <h4 className="font-medium text-xs text-gray-900 mb-2 group-hover:text-[#2d5f3f] transition-colors duration-300 ease-in-out line-clamp-2 leading-tight">
                  {product.name}
                </h4>
              </Link>
              
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star size={12} className="text-amber-400 fill-current" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
              
              <div className="mt-auto text-center">
                <div className="text-lg font-bold text-[#2d5f3f] group-hover:scale-105 transition-transform duration-300 ease-in-out">
                  ₹{product.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed

