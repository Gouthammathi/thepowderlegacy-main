import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Filter, Grid, List, Star, ShoppingCart, Heart, Leaf } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useFavorites } from '../../contexts/FavoritesContext'
import { fetchProducts } from '../../services/products'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

function Products() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery()
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProductSizes, setSelectedProductSizes] = useState({})
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: 'all', label: 'All Products', icon: '🌿' },
    { value: 'skin-care', label: 'Skin Care', icon: '✨' },
    { value: 'hair-care', label: 'Hair Care', icon: '💆' },
    { value: 'oral-care', label: 'Oral Care', icon: '😊' }
  ]

  useEffect(() => {
    let cancelled = false
    async function load() {
      const list = await fetchProducts({})
      if (!cancelled) {
        setProducts(list)
        setFilteredProducts(list)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const q = query.get('q') || ''
    if (q) setSearchQuery(q)
  }, [query])

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchQuery) {
      const key = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(key) ||
        product.description?.toLowerCase().includes(key) ||
        product.ingredients?.toLowerCase().includes(key) ||
        product.category?.replace('-', ' ').toLowerCase().includes(key)
      )
    }

    // Sort with priority first, then by user selection
    filtered.sort((a, b) => {
      // Priority sorting (higher priority comes first)
      const priorityDiff = (b.priority || 0) - (a.priority || 0)
      if (priorityDiff !== 0) return priorityDiff

      // Then apply user-selected sorting
      switch (sortBy) {
        case 'price-low':
          return (a.sizes?.[0]?.price || 0) - (b.sizes?.[0]?.price || 0)
        case 'price-high':
          return (b.sizes?.[0]?.price || 0) - (a.sizes?.[0]?.price || 0)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'reviews':
          return (b.reviews || 0) - (a.reviews || 0)
        default:
          return (a.name || '').localeCompare(b.name || '')
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, sortBy, searchQuery, products])

  const getCategoryFromPath = () => {
    const path = location.pathname
    if (path.includes('skin-care')) return 'skin-care'
    if (path.includes('hair-care')) return 'hair-care'
    if (path.includes('oral-care')) return 'oral-care'
    return 'all'
  }

  useEffect(() => {
    const categoryFromPath = getCategoryFromPath()
    if (categoryFromPath !== 'all') setSelectedCategory(categoryFromPath)
  }, [location.pathname])

  const handleAddToCart = (product) => {
    const selectedSize = selectedProductSizes[product.id] || product.sizes?.[0]?.size
    const sizeObj = product.sizes?.find(size => size.size === selectedSize)
    if (sizeObj) addToCart(product, sizeObj, 1)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedProductSizes(prev => ({ ...prev, [productId]: size }))
  }


  const currentCategory = categories.find(cat => cat.value === selectedCategory)

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8 sm:pb-10 relative z-10">
        {/* Minimal Header */}
        <div className="mb-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Natural Powder Collection
            </h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Premium traditional herbal powders for skin, hair, and oral care
            </p>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-4">
          {/* Mobile: Compact pills */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5
                  ${selectedCategory === category.value
                    ? 'bg-[#2d5f3f] text-white shadow-md'
                    : 'bg-white/90 text-gray-700 hover:bg-white shadow-sm border border-gray-200'
                  }
                `}
              >
                <span className="text-sm">{category.icon}</span>
                <span className="whitespace-nowrap">{category.label}</span>
              </button>
            ))}
          </div>
          
          {/* Desktop: Minimal category buttons */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-sm border
                  ${selectedCategory === category.value
                    ? 'bg-[#2d5f3f] text-white shadow-md border-[#2d5f3f]'
                    : 'bg-white/90 text-gray-700 hover:bg-white border-gray-200 hover:border-[#2d5f3f]/30'
                  }
                `}
              >
                <span className="text-base">{category.icon}</span>
                <span className="whitespace-nowrap">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Professional Filter Bar */}
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          {/* Left Section - Sort & Count */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
            
            <div className="hidden sm:block text-sm text-gray-500">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </div>
          </div>

          {/* Right Section - View Toggle & Mobile Filter */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>

            {/* View Toggle */}
            <div className="flex bg-gray-50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#2d5f3f] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="Grid View"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#2d5f3f] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title="List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <div className="md:hidden mt-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    navigate(`/shop${e.target.value === 'all' ? '' : `/${e.target.value}`}`)
                    setShowFilters(false)
                  }}
                  className="w-full px-3 py-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setShowFilters(false)
                  }}
                  className="w-full px-3 py-2 border-0 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="text-stone-400 mb-4">
              <Leaf size={48} className="sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">No products found</h3>
            <p className="text-sm sm:text-base text-stone-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6'
              : 'space-y-3 sm:space-y-4'
          }>
          {filteredProducts.map((product) => {
              const selectedSize = selectedProductSizes[product.id] || product.sizes?.[0]?.size
              const sizeObj = product.sizes?.find(size => size.size === selectedSize) || product.sizes?.[0]

              if (viewMode === 'list') {
                // List View
                return (
                  <div key={product.id} className="bg-white rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <Link to={`/shop/product/${product.id}`} className="sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40 flex-shrink-0 relative bg-gradient-to-br from-stone-50 to-stone-100">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <Leaf size={20} className="sm:w-8 sm:h-8" />
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 p-2 sm:p-3 lg:p-4 flex flex-col justify-between">
                        <div>
                          <Link to={`/shop/product/${product.id}`}>
                            <h3 className="text-[11px] sm:text-sm lg:text-base font-medium text-stone-900 mb-0.5 sm:mb-1 hover:text-[#2d5f3f] transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[9px] sm:text-xs text-stone-600 mb-1 sm:mb-2 line-clamp-2">{product.description}</p>
                          <div className="flex items-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={8} className={`sm:w-3 sm:h-3 ${i < Math.floor(product.rating || 0) ? 'text-amber-400 fill-current' : 'text-stone-300'}`} />
                              ))}
                            </div>
                            <span className="text-[8px] sm:text-[9px] text-stone-500">({product.reviews || 0})</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <div className="text-sm sm:text-base lg:text-lg font-bold text-[#2d5f3f]">₹{sizeObj?.price || 0}</div>
                            <select
                              value={selectedSize}
                              onChange={(e) => handleSizeSelect(product.id, e.target.value)}
                              className="text-[8px] sm:text-[9px] border border-stone-300 rounded px-1 py-0.5 sm:px-2 sm:py-1 focus:outline-none focus:ring-1 focus:ring-[#2d5f3f]"
                            >
                              {product.sizes?.map(size => (
                                <option key={size.size} value={size.size}>{size.size}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center gap-0.5 sm:gap-1">
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className={`p-1.5 sm:p-2 rounded-md transition-all hover:scale-110 ${
                                favorites.includes(product.id)
                                  ? 'bg-red-50 text-red-500'
                                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                              }`}
                            >
                              <Heart size={12} className={`sm:w-4 sm:h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="bg-[#2d5f3f] text-white px-2 py-1.5 sm:px-3 sm:py-2 text-[9px] sm:text-[10px] font-medium rounded flex items-center gap-0.5 hover:bg-[#1e4a2f] transition-colors"
                            >
                              <ShoppingCart size={10} className="sm:w-3 sm:h-3" />
                              <span className="hidden sm:inline">Add to Cart</span>
                              <span className="sm:hidden">Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Grid View
              return (
                <div key={product.id} className="group h-full flex flex-col bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out border border-gray-100">
                  <Link to={`/shop/product/${product.id}`} className="block relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Leaf size={20} />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(product.id)
                      }}
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
                </div>
              )
          })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
