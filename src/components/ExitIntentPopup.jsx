import React, { useState, useEffect } from 'react'
import { X, Gift, Mail, Star, Clock } from 'lucide-react'

function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('exitIntentShown')
    if (hasSeenPopup) return

    // Track mouse movement
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setIsVisible(true)
        localStorage.setItem('exitIntentShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email)
      setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5f3f]/5 to-[#d4a574]/5"></div>

        <div className="relative p-8 text-center">
          {!isSubmitted ? (
            <>
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d5f3f] to-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} className="text-white" />
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wait! Don't Miss Out! 🎁
              </h3>
              <p className="text-gray-600 mb-6">
                Get <strong>10% OFF</strong> your first order + exclusive wellness tips delivered to your inbox
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Star size={16} className="text-amber-400 fill-current" />
                  <span>10% discount on your first order</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail size={16} className="text-[#2d5f3f]" />
                  <span>Weekly wellness tips & recipes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock size={16} className="text-green-500" />
                  <span>Early access to new products</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5f3f] focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#1e4a2f] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#1e4a2f] hover:to-[#2d5f3f] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get My 10% Discount! 🎉
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to The Powder Legacy! 🎉
              </h3>
              <p className="text-gray-600 mb-4">
                Check your email for your 10% discount code and welcome message!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Your discount code:</strong> WELCOME10
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExitIntentPopup

