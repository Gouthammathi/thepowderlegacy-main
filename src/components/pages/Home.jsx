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
      <section className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/bannerr.png"
            alt="Traditional Indian family using natural powders"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-end px-4 sm:px-6 lg:px-8 w-full h-full pt-80 sm:pb-20 md:pb-40">
          
          {/* Elegant Welcome Content */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4 w-full px-3 sm:px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white drop-shadow-lg max-w-2xl sm:max-w-3xl mx-auto leading-relaxed" 
               style={{ 
                 fontFamily: 'Playfair Display, serif',
                 textShadow: '0 3px 6px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.5)',
                 letterSpacing: '0.04em',
                 lineHeight: '1.6',
                 fontStyle: 'italic',
                 fontWeight: '600',
                 color: '#ffffff'
               }}>
              Join families across generations who trust our authentic, chemical-free natural powders for their daily wellness and beauty rituals.
            </p>
          </div>

          {/* Elegant CTA Button */}
          <div className="flex justify-center mt-0 mb-0">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-[#2d5f3f] to-[#1e4029] hover:from-[#1e4029] hover:to-[#0f2a1a] text-white font-bold py-2 sm:py-2.5 px-5 sm:px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-center text-xs sm:text-sm border-2 border-white/30 hover:border-white/50 relative overflow-hidden"
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
