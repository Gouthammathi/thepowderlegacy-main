import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!formData.name) nextErrors.name = 'Name is required'
    if (!formData.email) nextErrors.email = 'Email is required'
    if (!formData.password) nextErrors.password = 'Password is required'
    if (formData.password.length < 6) nextErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)

    try {
      const user = await signup(formData.email, formData.password, formData.name)
      
      // Check if email confirmation is required
      if (user && !user.email_confirmed_at) {
        // Email confirmation required - show message
        alert('Account created! Please check your email to verify your account before logging in.')
      }
      
      // Handle redirects after signup
      const redirect = searchParams.get('redirect')
      if (redirect === 'checkout') {
        navigate('/checkout/address')
      } else if (redirect) {
        navigate(`/${redirect}`)
      } else {
        navigate('/')
      }
    } catch (err) {
      let errorMessage = err?.message || 'Signup failed'
      
      if (errorMessage.includes('already registered')) {
        errorMessage = 'This email is already registered. Please login instead.'
      }
      
      setErrors({ email: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex"
      style={{
        backgroundImage: 'url(/images/doo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center'
      }}
    >
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-3.5 shadow-xl">
          <div className="mb-3.5 text-center">
            <h1 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Join Our Community
            </h1>
            <p className="text-xs text-gray-500">Create your account to start your natural wellness journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-2 pr-9 border-0 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                <User size={14} className="absolute right-2.5 top-2 text-gray-400" />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-2 pr-9 border-0 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                <Mail size={14} className="absolute right-2.5 top-2 text-gray-400" />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-2 pr-9 border-0 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <Lock size={14} className="absolute right-2.5 top-2 text-gray-400" />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-2.5 py-2 pr-9 border-0 bg-gray-50 rounded-lg focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <Lock size={14} className="absolute right-2.5 top-2 text-gray-400" />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#1e4029] text-white py-2 rounded-lg font-semibold hover:from-[#1e4029] hover:to-[#0f1f15] transition-all duration-200 disabled:opacity-50 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm"
                  >
                    {isSubmitting ? 'Creating account…' : 'Create Account'}
                  </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-sm text-[#2d5f3f] hover:text-[#1e4029] font-semibold transition-colors hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative p-8">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat rounded-3xl shadow-2xl"
          style={{
            backgroundImage: 'url(/images/login.png)'
          }}
        ></div>
      </div>
    </div>
  )
}

export default Signup
