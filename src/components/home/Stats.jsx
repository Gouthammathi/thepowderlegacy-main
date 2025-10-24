import React from 'react'
import { motion } from 'framer-motion'
import { Users, Award, TrendingUp, Clock } from 'lucide-react'

function Stats() {
  const stats = [
    { icon: <Users size={32} />, value: "10,000+", label: "Happy Customers" },
    { icon: <Award size={32} />, value: "100%", label: "Natural Products" },
    { icon: <TrendingUp size={32} />, value: "4.8/5", label: "Customer Rating" },
    { icon: <Clock size={32} />, value: "24/7", label: "Customer Support" }
  ]

  return (
    <section 
      className="pt-4 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-14 relative"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-[#2d5f3f] flex justify-center mb-2 sm:mb-3">
                {React.cloneElement(stat.icon, { size: 24, className: 'sm:w-8 sm:h-8' })}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-stone-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
