import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, Star, ChevronLeft, ChevronRight, ArrowLeft, Package, Leaf, Clock, CheckCircle, Minus, Plus } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { fetchProductById, fetchRelated } from '../../services/products'
import { productsData } from '../../data/products'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { currentUser } = useAuth()
  const { toggleFavorite, isFavorite } = useFavorites()
  
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setIsLoading(true)
      try {
        const prod = await fetchProductById(id)
        if (!prod) {
          navigate('/shop')
          return
        }
        if (cancelled) return
        setProduct(prod)
        // Set 200g as default, or first size if 200g not available
        const defaultSize = prod.sizes?.find(size => size.size === '200g') || prod.sizes?.[0]
        setSelectedSize(defaultSize?.size || null)
              const related = await fetchRelated(prod, 4)
              if (!cancelled) setRelatedProducts(related)
      } catch (error) {
        console.error('Error loading product:', error)
        navigate('/shop')
      } finally {
        setIsLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id, navigate])

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, quantity)
    }
  }

  const handleBuyNow = () => {
    if (product && selectedSize) {
      addToCart(product, selectedSize, quantity)
      navigate('/cart')
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2d5f3f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Package size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-[#2d5f3f] text-white px-4 py-2 rounded-lg hover:bg-[#1e4a2f] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const selectedSizeObj = selectedSize || product.sizes[0]

  // Usage instructions based on category
  const getUsageInstructions = (category) => {
    const instructions = {
      'skin-care': {
        steps: [
          "Mix 1-2 tablespoons of powder with water or rose water",
          "Apply evenly on clean, damp skin using gentle circular motions",
          "Leave for 10-15 minutes, then rinse with lukewarm water",
          "Use 2-3 times per week for best results"
        ],
        tips: ["Always do a patch test first", "Store in cool, dry place", "Avoid contact with eyes"]
      },
      'hair-care': {
        steps: [
          "Mix 2-3 tablespoons with water or coconut oil to make paste",
          "Apply to wet hair, focusing on scalp and roots",
          "Massage gently for 5-10 minutes, then leave for 30-45 minutes",
          "Rinse thoroughly with water"
        ],
        tips: ["Use wide-tooth comb to distribute", "Follow with mild conditioner", "Use once or twice per week"]
      },
      'oral-care': {
        steps: [
          "Wet your toothbrush and dip into the powder",
          "Brush teeth gently in circular motions for 2-3 minutes",
          "Rinse mouth thoroughly with water",
          "Use twice daily for optimal results"
        ],
        tips: ["Use soft-bristled toothbrush", "Don't swallow the powder", "Replace every 3 months"]
      }
    }
    return instructions[category] || instructions['skin-care']
  }

  const usageInfo = getUsageInstructions(product.category)

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/images/doo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-white/40"></div>
      {/* Header */}
      <div className="border-b border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-[#2d5f3f] transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/home" className="hover:text-[#2d5f3f]">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-[#2d5f3f]">Shop</Link>
              <span>/</span>
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - 50/50 Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images - Left Side (50%) */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-[#2d5f3f] ring-2 ring-[#2d5f3f]/20' 
                        : 'border-gray-200 hover:border-[#2d5f3f]/50'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Right Side (50%) */}
          <div className="space-y-8">
            
            {/* Product Header */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Description under title */}
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="text-4xl font-bold text-[#2d5f3f] mb-8">
                ₹{selectedSize ? product.sizes.find(s => s.size === selectedSize)?.price.toLocaleString('en-IN') : selectedSizeObj.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size.size)}
                    className={`px-4 py-2 rounded-md border transition-all text-sm font-medium ${
                      selectedSize === size.size
                        ? 'border-[#2d5f3f] bg-[#2d5f3f] text-white'
                        : size.size === '200g' && !selectedSize
                        ? 'border-[#2d5f3f] bg-[#2d5f3f]/10 text-[#2d5f3f]'
                        : 'border-gray-300 text-gray-700 hover:border-[#2d5f3f] hover:text-[#2d5f3f]'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>



            {/* Action Buttons - New Color Theme */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Buy Now
              </button>
              
              <div className="flex gap-3">
                      <button
                        onClick={handleToggleFavorite}
                        className={`flex-1 border-2 ${
                          isFavorite(product.id)
                            ? 'border-red-500 bg-red-50 text-red-600'
                            : 'border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-700'
                        } font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                        {isFavorite(product.id) ? 'Favorited' : 'Favorite'}
                      </button>
                
                <button
                  onClick={handleShare}
                  className="flex-1 border-2 border-gray-300 hover:border-[#2d5f3f] hover:bg-[#2d5f3f]/5 text-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Usage Guide - Full Width Below */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">About This Product</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Benefits</h4>
                <p className="text-gray-700">{product.benefits}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Ingredients</h4>
                <p className="text-gray-700">{product.ingredients}</p>
              </div>
            </div>
          </div>

          {/* Usage Guide - Always Visible */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Steps</h4>
                <div className="space-y-3">
                  {usageInfo.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#2d5f3f] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Important Tips</h4>
                <div className="space-y-2">
                  {usageInfo.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/shop/product/${relatedProduct.id}`}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden">
                    {relatedProduct.images?.[0] ? (
                      <img 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Leaf size={24} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#2d5f3f] transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(relatedProduct.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'} />
                      ))}
                      <span className="text-xs text-gray-500">({relatedProduct.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-[#2d5f3f]">
                      ₹{relatedProduct.sizes?.[0]?.price?.toLocaleString('en-IN') || 0}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail