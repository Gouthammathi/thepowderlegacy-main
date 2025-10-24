import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../services/products'
import RecentlyViewed from '../RecentlyViewed'
import WhyChooseUs from '../home/WhyChooseUs'
import Bestsellers from '../home/Bestsellers'
import ShopByCategories from '../home/ShopByCategories'
import Testimonials from '../home/Testimonials'
import Stats from '../home/Stats'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const list = await fetchProducts({})
      const top = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8)
      if (!cancelled) setFeaturedProducts(top)
    }
    load()
    return () => { cancelled = true }
  }, [])


  return (
    <div className="min-h-screen">
      {/* Hero Section with Traditional Family Image */}
      <section className="relative w-full aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/banner2.png"
            alt="Traditional Indian family using natural powders"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-end justify-start px-4 sm:px-6 lg:px-8 w-full h-full pt-8 sm:pt-34">

          {/* Elegant Welcome Content */}
          <div className="text-right mb-4 sm:mb-6 max-w-2xl px-4">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black mb-1 sm:mb-2 leading-tight" 
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '0.04em',
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FF8C00 75%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }}>
              The Powder Legacy
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white drop-shadow-xl mb-1 sm:mb-2" 
               style={{ 
                 fontFamily: 'Playfair Display, serif',
                 textShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)',
                 letterSpacing: '0.02em',
                 background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 fontStyle: 'italic',
                 fontWeight: '600'
               }}>
              {/* Where Tradition Meets Natural Beauty */}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-lg max-w-lg mx-auto leading-relaxed" 
               style={{ 
                 fontFamily: 'Inter, system-ui, sans-serif',
                 textShadow: '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1)',
                 letterSpacing: '0.01em',
                 lineHeight: '1.4'
               }}>
              Join families across generations who trust our authentic, chemical-free natural powders for their daily wellness and beauty rituals.
            </p>
          </div>

          {/* Elegant CTA Button */}
          <div className="flex justify-end mt-1 sm:mt-2 mr-8 sm:mr-55">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-[#2d5f3f] to-[#1e4029] hover:from-[#1e4029] hover:to-[#0f2a1a] text-white font-bold py-1.5 sm:py-2.5 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-center text-xs sm:text-sm border-2 border-white/30 hover:border-white/50 relative overflow-hidden"
              style={{
                textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)',
                letterSpacing: '0.03em',
                boxShadow: '0 0 20px rgba(45, 95, 63, 0.4), 0 0 40px rgba(45, 95, 63, 0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)',
                fontFamily: 'Playfair Display, serif',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}
            >
              <span className="relative z-10">Explore Heritage</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Bestsellers Section */}
      <Bestsellers featuredProducts={featuredProducts} />

      {/* Shop by Categories Section */}
      <ShopByCategories />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Recently Viewed Section */}
      <section className="  bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecentlyViewed />
        </div>
      </section>

      {/* Stats Section */}
      <Stats />
    </div>
  )
}

export default Home
