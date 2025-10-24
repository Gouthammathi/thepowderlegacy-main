import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Heart, ShoppingCart, Leaf } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'

function Bestsellers({ featuredProducts }) {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [selectedSizes, setSelectedSizes] = useState({})

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0].size
    const sizeObj = product.sizes.find(size => size.size === selectedSize)
    addToCart(product, sizeObj, 1)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }


  return (
    <section 
      className="py-12 sm:py-14 lg:py-18 relative"
      style={{
        backgroundImage: 'url(/images/doo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-white/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 lg:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-stone-900 mb-2 sm:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Bestsellers
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-stone-600">
              Loved by thousands of customers across India
            </p>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-[#2d5f3f] font-semibold hover:gap-4 transition-all text-sm lg:text-base whitespace-nowrap">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.slice(0, 4).map((product, idx) => {
            const selectedSize = selectedSizes[product.id] || product.sizes[0]?.size
            const sizeObj = product.sizes?.find(size => size.size === selectedSize) || product.sizes?.[0]

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group h-full flex flex-col bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out border border-gray-100"
              >
                <Link to={`/shop/product/${product.id}`} className="block relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {product.images?.[0] ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Leaf size={20} />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                            className={`absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110 ${
                              isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
                            }`}
                          >
                            <Heart size={14} className={`${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </Link>

                <div className="p-3 flex flex-col h-full">
                  <Link to={`/shop/product/${product.id}`}>
                    <h3 className="font-medium text-xs text-gray-900 mb-2 group-hover:text-[#2d5f3f] transition-colors duration-300 ease-in-out line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-[#2d5f3f] group-hover:scale-105 transition-transform duration-300 ease-in-out">
                      ₹{sizeObj?.price || 0}
                    </div>
                    <select 
                      value={selectedSize}
                      onChange={(e) => handleSizeSelect(product.id, e.target.value)}
                      className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-300 ease-in-out min-w-[50px] bg-white group-hover:scale-105"
                    >
                      {product.sizes?.map(size => (
                        <option key={size.size} value={size.size}>{size.size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-auto">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-[#2d5f3f] text-white py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#1e4029] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md group-hover:scale-105"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link to="/shop" className="btn-outline inline-flex items-center gap-2">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Bestsellers
