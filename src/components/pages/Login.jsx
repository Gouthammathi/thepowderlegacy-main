import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!formData.email) nextErrors.email = 'Email is required'
    if (!formData.password) nextErrors.password = 'Password is required'
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
      await login(formData.email, formData.password)
      
      // Handle redirects after login
      const redirect = searchParams.get('redirect')
      if (redirect === 'checkout') {
        navigate('/checkout/address')
      } else if (redirect) {
        navigate(`/${redirect}`)
      } else {
        navigate('/')
      }
    } catch (err) {
      // Handle specific error messages
      let errorMessage = err?.message || 'Login failed'
      
      if (errorMessage.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email address. Check your inbox for a verification link.'
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.'
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
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-2xl">
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1.5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500">Sign in to your account to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {errors.email && !errors.password && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{errors.email}</p>
              </div>
            )}
            
            <div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 pr-10 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.email && errors.password ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                <Mail size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
              {errors.email && errors.password && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2.5 pr-10 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-[#2d5f3f] focus:bg-white transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <Lock size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-xs text-[#2d5f3f] hover:text-[#1e4029] font-medium">
                  Forgot password?
                </Link>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2d5f3f] to-[#1e4029] text-white py-2.5 rounded-xl font-semibold hover:from-[#1e4029] hover:to-[#0f1f15] transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-sm text-[#2d5f3f] hover:text-[#1e4029] font-semibold transition-colors hover:underline">
                Signup
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

export default Login
