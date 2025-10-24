import React, { useState } from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Send, ChevronDown, ChevronUp } from 'lucide-react'
import { saveContactMessage } from '../../services/db'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await saveContactMessage(formData)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error('Failed to save contact message', err)
      alert('There was an error sending your message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/doo.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'center'
        }}
      >
        {/* Background overlay for better content readability */}
        <div className="absolute inset-0 bg-white/40"></div>
        
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md relative z-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-800" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

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
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Get in Touch
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#2d5f3f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#2d5f3f]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-sm text-gray-600 mb-2">contact@thepowderlegacy.in</p>
                    <a 
                      href="mailto:contact@thepowderlegacy.in"
                      className="text-sm text-[#2d5f3f] hover:text-[#1e4029] transition-colors"
                    >
                      Send us an email →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#2d5f3f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#2d5f3f]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                    <p className="text-sm text-gray-600 mb-2">+91-7337334653</p>
                    <a 
                      href="tel:+917337334653"
                      className="text-sm text-[#2d5f3f] hover:text-[#1e4029] transition-colors"
                    >
                      Call us now →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#2d5f3f]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#2d5f3f]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p>Plot No. 542, Ground Floor</p>
                      <p>Dr. Prakashrao Nagar, Annojiguda</p>
                      <p>Ghatkesar – 500088</p>
                      <p>Telangana, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Follow Us
              </h2>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/thepowderlegacystore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/thepowderlegacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="order-support">Order Support</option>
                    <option value="general-question">General Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] transition-all duration-200"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2d5f3f] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#1e4029] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                id: 1,
                question: "How long does shipping take?",
                answer: "We typically ship orders within 1-2 business days. Delivery time depends on your location, usually 3-7 business days within India."
              },
              {
                id: 2,
                question: "Are your products safe for all ages?",
                answer: "Yes, all our products are made with natural ingredients and are safe for the whole family, including children and sensitive skin."
              },
              {
                id: 3,
                question: "Do you offer wholesale pricing?",
                answer: "Yes, we offer special wholesale rates for bulk orders. Please contact us with your requirements for a custom quote."
              },
              {
                id: 4,
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unopened products. If you're not satisfied, contact us and we'll help you with the return process."
              },
              {
                id: 5,
                question: "How should I store the products?",
                answer: "Store in a cool, dry place away from direct sunlight. Keep containers tightly closed to maintain freshness and potency."
              },
              {
                id: 6,
                question: "Are your products organic certified?",
                answer: "While we use natural and organic ingredients, we're currently working towards full organic certification. All ingredients are carefully sourced and tested."
              }
            ].map((faq) => (
              <div key={faq.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 group"
                >
                  <h3 className="text-base font-medium text-gray-900 pr-4 group-hover:text-[#2d5f3f] transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 transition-all duration-300 ease-in-out">
                    {openFAQ === faq.id ? (
                      <ChevronUp size={18} className="text-[#2d5f3f] rotate-180" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 group-hover:text-[#2d5f3f] transition-colors duration-300" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === faq.id 
                      ? 'max-h-96 opacity-100 transform translate-y-0' 
                      : 'max-h-0 opacity-0 transform -translate-y-2'
                  }`}
                  style={{
                    transitionProperty: 'max-height, opacity, transform',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div className="px-5 pb-4 pt-1">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
