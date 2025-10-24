import React, { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Clock, Minimize2 } from 'lucide-react'

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help with your natural powder needs. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickReplies = [
    "Product help",
    "Usage guide", 
    "Shipping",
    "Order status",
    "Ingredients"
  ]

  const handleSendMessage = (message) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message)
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return "I'd be happy to recommend products! For skin care, try our Sassy Sunnipindi or Authentic Avarampoo. For hair care, our Anti Hairfall powder is very popular. What's your main concern?"
    }
    
    if (lowerMessage.includes('usage') || lowerMessage.includes('how to use')) {
      return "Great question! Mix 1-2 tablespoons of powder with water/rose water to make a paste. Apply gently, leave for 10-15 minutes, then rinse. Use 2-3 times weekly for best results. Need specific instructions for any product?"
    }
    
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We ship across India! Standard delivery takes 3-5 days, express delivery 1-2 days. Free shipping on orders above ₹500. We use secure packaging to protect your products."
    }
    
    if (lowerMessage.includes('ingredient') || lowerMessage.includes('natural')) {
      return "All our products are 100% natural with traditional Ayurvedic ingredients like turmeric, neem, sandalwood, and more. No chemicals, preservatives, or artificial additives. Each product lists all ingredients clearly."
    }
    
    if (lowerMessage.includes('order') || lowerMessage.includes('status')) {
      return "To check your order status, please share your order number or email. You can also check in your account under 'My Orders'. Need help with anything else?"
    }
    
    return "Thanks for your message! Our team will get back to you soon. For immediate help, you can also call us at +91-7337334653 or email contact@thepowderlegacy.in"
  }

  const handleQuickReply = (reply) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Professional Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-white hover:bg-gray-50 text-[#2d5f3f] p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 border border-gray-200 group"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 bg-[#2d5f3f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            1
          </div>
        </button>
      )}

      {/* Professional Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl z-50 transition-all duration-300 border border-gray-100 ${
          isMinimized ? 'h-16' : 'h-[500px]'
        }`}>
          {/* Minimal Header */}
          <div className="bg-white border-b border-gray-100 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-gray-900">Support</h3>
                <p className="text-xs text-gray-500">We're here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Professional Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-[#2d5f3f] text-white'
                          : 'bg-gray-50 text-gray-800 border border-gray-100'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 text-gray-600 px-4 py-3 rounded-2xl text-sm border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span>Typing</span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Minimal Quick Replies */}
              {messages.length === 1 && (
                <div className="px-4 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Professional Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessage)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2d5f3f] focus:border-[#2d5f3f] text-sm bg-gray-50"
                  />
                  <button
                    onClick={() => handleSendMessage(newMessage)}
                    className="bg-[#2d5f3f] hover:bg-[#1e4029] text-white p-3 rounded-xl transition-colors shadow-sm hover:shadow-md"
                  >
                    <Send size={18} />
                  </button>
                </div>
                
                {/* Minimal Contact Options */}
                <div className="flex items-center justify-center mt-3 text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <a href="tel:+917337334653" className="flex items-center gap-1 hover:text-[#2d5f3f] transition-colors">
                      <Phone size={12} />
                      Call
                    </a>
                    <a href="mailto:contact@thepowderlegacy.in" className="flex items-center gap-1 hover:text-[#2d5f3f] transition-colors">
                      <Mail size={12} />
                      Email
                    </a>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>9 AM - 8 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default LiveChat

