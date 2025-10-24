import React from 'react'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Shield, Package, Heart, ArrowRight, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { productsData } from '../../data/products'

function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart, getCartTotal, getCartSavings, clearCart } = useCart()

  const handleUpdateQuantity = (id, size, newQuantity) => {
    updateQuantity(id, size, newQuantity)
  }

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size)
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-lg mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="text-gray-400" size={64} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Your cart is empty
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover our natural products and start your wellness journey
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#1e4029] text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate cart totals with proper validation
  const subtotal = getCartTotal()
  const savings = getCartSavings()
  const shipping = 0 // Free shipping
  const total = Math.max(0, subtotal + shipping - savings) // Ensure total is never negative
  
  // Safety check for NaN values
  if (isNaN(subtotal) || isNaN(total)) {
    console.error('❌ NaN detected in cart totals:', { subtotal, total, savings, shipping })
    // Clear cart if NaN detected
    clearCart()
  }
  
  // Format numbers for display
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[#2d5f3f] font-medium hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                        {item.image ? (
                          <Link to={`/shop/product/${item.id}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Package size={24} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1 pr-4">
                            <Link to={`/shop/product/${item.id}`}>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-[#2d5f3f] transition-colors mb-1">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.category.replace('-', ' ')} • {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-600">Quantity:</span>
                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-semibold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-lg transition-colors"
                                disabled={item.maxStock && item.quantity >= item.maxStock}
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">
                              ₹{formatPrice(item.price || 0)} each
                            </div>
                            <div className="text-2xl font-bold text-[#2d5f3f]">
                              ₹{formatPrice((item.price || 0) * (item.quantity || 0))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <Link
              to="/shop"
              className="md:hidden mt-6 w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:sticky lg:top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-semibold">₹{formatPrice(subtotal)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
                      <Tag size={16} />
                      Savings
                    </span>
                    <span className="font-semibold">-₹{formatPrice(savings)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#2d5f3f]">₹{formatPrice(total)}</div>
                      <div className="text-sm text-gray-500">Inclusive of all taxes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-green-800">
                    <Shield size={18} className="flex-shrink-0" />
                    <span>Secure & Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-800">
                    <Package size={18} className="flex-shrink-0" />
                    <span>Free Shipping on All Orders</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-800">
                    <Heart size={18} className="flex-shrink-0" />
                    <span>100% Natural Products</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-[#2d5f3f] hover:bg-[#1e4029] text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 mb-3 transition-colors shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/shop"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
