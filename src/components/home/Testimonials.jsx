import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

function Testimonials() {
  const scrollRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollLeft = () => {
    if (scrollRef.current) {
      const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      scrollRef.current.scrollTo({ left: newIndex * 320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      scrollRef.current.scrollTo({ left: newIndex * 320, behavior: 'smooth' })
    }
  }

  // Auto-scroll functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight()
    }, 5000) // Auto-scroll every 5 seconds

    return () => clearInterval(interval)
  }, [currentIndex])

  const testimonials = [
    { 
      name: "Priya ", 
      location: "Hyderabad, Telangana",
      avatar: "P",
      customerImage: "/reviews/r1.jpg",
      rating: 5, 
      comment: "The Sassy Sunnipindi transformed my skin! Completely natural and so effective. I've recommended it to all my friends." 
    },
    { 
      name: "Rajesh Kumar", 
      location: "Tirupati, Andhra Pradesh",
      avatar: "RK",
      customerImage: "/reviews/r2.jpg",
      rating: 5, 
      comment: "Anti Hairfall powder is a game-changer. Natural ingredients, visible results. My hair feels stronger and healthier than ever!" 
    },
    { 
      name: "Sunita Reddy", 
      location: "Bangalore, Karnataka",
      avatar: "SR",
      customerImage: "/reviews/r4.jpg",
      rating: 5, 
      comment: "Authentic quality and traditional recipes. Love that they're chemical-free and safe for my entire family. Highly recommended!" 
    },
    { 
      name: "Ramya", 
      location: "Hyderabad,Telangana",
      avatar: "R",
      customerImage: "/reviews/r3.jpg",
      rating: 5, 
      comment: "Highly recommended!" 
    }
  ]

  return (
    <section 
      className="pt-2 pb-12 sm:pt-4 sm:pb-14 lg:pt-6 lg:pb-18 relative text-white"
      style={{
        backgroundImage: 'url(/images/reviews.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-white/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-[#2d5f3f] font-medium">
            Join thousands of happy customers experiencing natural care
          </p>
        </div>

         <div className="relative">
           {/* Navigation Buttons */}
           <button
             onClick={scrollLeft}
             className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2d5f3f] p-2 rounded-full shadow-lg transition-all hover:scale-110 hidden sm:block"
           >
             <ChevronLeft size={20} />
           </button>
           
           <button
             onClick={scrollRight}
             className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#2d5f3f] p-2 rounded-full shadow-lg transition-all hover:scale-110 hidden sm:block"
           >
             <ChevronRight size={20} />
           </button>

           {/* Carousel Container */}
           <div 
             ref={scrollRef}
             className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scroll-smooth" 
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
             {testimonials.map((testimonial, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-[#2d5f3f] rounded-xl p-4 flex-shrink-0 w-64 sm:w-72"
             >
               {/* 5-Star Rating at the top */}
               <div className="flex justify-center mb-3">
                 <div className="flex items-center gap-0.5">
                   {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} size={14} className="text-amber-400 fill-current" />
                   ))}
                 </div>
               </div>

               {/* WhatsApp Screenshot */}
               <div className="mb-3">
                 <div className="bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm">
                   <img 
                     src={testimonial.customerImage} 
                     alt={`${testimonial.name} testimonial`}
                     className="w-full h-auto object-cover"
                     onError={(e) => {
                       e.target.style.display = 'none'
                       e.target.nextElementSibling.style.display = 'flex'
                     }}
                   />
                   {/* Fallback placeholder when image fails to load */}
                   <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-500" style={{display: 'none'}}>
                     <div className="text-center">
                       <div className="text-3xl mb-1">📱</div>
                       <div className="text-xs font-medium">WhatsApp</div>
                       <div className="text-xs text-gray-400">Screenshot</div>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Customer Info - Centered */}
               <div className="text-center">
                 <div className="font-bold text-white text-sm mb-1">{testimonial.name}</div>
                 <div className="text-xs text-white/80">{testimonial.location}</div>
               </div>
             </motion.div>
           ))}
           </div>
         </div>
      </div>
    </section>
  )
}

export default Testimonials
