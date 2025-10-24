import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Shield, Award, CheckCircle } from 'lucide-react'

function WhyChooseUs() {
  return (
    <section 
      className="py-12 sm:py-14 lg:py-18 relative"
      style={{
        backgroundImage: 'url(/images/doodle.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-white/55"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto px-4">
            Experience the perfect blend of ancient wisdom and modern quality standards
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {[
            { 
              icon: <Leaf size={24} />, 
              title: "100% Natural", 
              description: "Pure ingredients, zero chemicals, completely safe for daily use",
              color: "text-emerald-600"
            },
            { 
              icon: <Shield size={24} />, 
              title: "Family Safe", 
              description: "Dermatologically tested, suitable for all skin types and ages",
              color: "text-blue-600"
            },
            { 
              icon: <Award size={24} />, 
              title: "Traditional Wisdom", 
              description: "Time-tested Ayurvedic formulas passed through generations",
              color: "text-amber-600"
            },
            { 
              icon: <CheckCircle size={24} />, 
              title: "Quality Assured", 
              description: "Handcrafted in small batches for premium quality control",
              color: "text-purple-600"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group text-center"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 mx-auto ${feature.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/90 shadow-sm border border-gray-100`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
