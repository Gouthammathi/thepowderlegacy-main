import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Heart, Smile, Leaf } from 'lucide-react'

function ShopByCategories() {
  const categories = [
    {
      id: 'skin-care',
      name: 'Skin Care',
      description: 'Natural powders for glowing, healthy skin',
      icon: <Sparkles size={24} className="text-pink-500" />,
      color: 'from-pink-50 to-rose-100',
      hoverColor: 'hover:from-pink-100 hover:to-rose-200',
      textColor: 'text-pink-700',
      link: '/shop/skin-care',
      products: '12 Products'
    },
    {
      id: 'hair-care',
      name: 'Hair Care',
      description: 'Traditional remedies for strong, lustrous hair',
      icon: <Heart size={24} className="text-purple-500" />,
      color: 'from-purple-50 to-violet-100',
      hoverColor: 'hover:from-purple-100 hover:to-violet-200',
      textColor: 'text-purple-700',
      link: '/shop/hair-care',
      products: '8 Products'
    },
    {
      id: 'oral-care',
      name: 'Oral Care',
      description: 'Natural solutions for healthy teeth and gums',
      icon: <Smile size={24} className="text-blue-500" />,
      color: 'from-blue-50 to-cyan-100',
      hoverColor: 'hover:from-blue-100 hover:to-cyan-200',
      textColor: 'text-blue-700',
      link: '/shop/oral-care',
      products: '6 Products'
    }
  ]

  return (
    <section 
      className="py-12 sm:py-16 lg:py-20 relative"
      style={{
        backgroundImage: 'url(/images/doodle.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-white/60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#2d5f3f]/10 rounded-full flex items-center justify-center">
              <Leaf size={20} className="text-[#2d5f3f]" />
            </div>
            <span className="text-sm font-medium text-[#2d5f3f] uppercase tracking-wide">Shop by Category</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Explore Our Collections
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated range of natural powders, organized by your specific needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link
                to={category.link}
                className="block bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.02] border border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/50`}>
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${category.textColor} group-hover:scale-105 transition-transform duration-300 mb-2`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <div className={`flex items-center gap-2 text-sm font-semibold ${category.textColor} group-hover:translate-x-1 transition-transform duration-300`}>
                      <span>Explore</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#2d5f3f] hover:bg-[#1e4029] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ShopByCategories
