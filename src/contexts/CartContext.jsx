import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useAuth } from './AuthContext'
import { saveCartSnapshot, loadCartSnapshot } from '../services/supabase-db'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.size === action.payload.size
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && item.size === action.payload.size)
        )
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

const getInitialItems = () => {
  try {
    const ls = localStorage.getItem('cart_items')
    if (ls) return JSON.parse(ls)
  } catch {}
  return []
}

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, { items: getInitialItems() })
  const [showCartNotification, setShowCartNotification] = useState(false)
  const [notificationItem, setNotificationItem] = useState(null)

  // Hydrate cart from Supabase or localStorage on load and when user changes
  useEffect(() => {
    async function hydrate() {
      try {
        if (currentUser) {
          const items = await loadCartSnapshot(currentUser.id)
          if (items && items.length > 0) {
            dispatch({ type: 'SET_ITEMS', payload: items })
            localStorage.setItem('cart_items', JSON.stringify(items))
            return
          }
        }
      } catch {}
      // Fallback localStorage
      const ls = localStorage.getItem('cart_items')
      if (ls) {
        try {
          const items = JSON.parse(ls)
          dispatch({ type: 'SET_ITEMS', payload: items })
        } catch {}
      }
    }
    hydrate()
  }, [currentUser])

  // Persist cart to Supabase (if logged in) and localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(state.items))
    async function persist() {
      if (!currentUser) return
      try {
        await saveCartSnapshot(currentUser.id, state.items)
      } catch {}
    }
    persist()
  }, [state.items, currentUser])

  const addToCart = (product, size, quantity = 1) => {
    if (!size) return
    
    // Validate price to prevent NaN
    const price = Number(size.price || 0)
    if (isNaN(price) || price <= 0) {
      console.error('❌ Invalid price for product:', product.name, 'Size:', size.size, 'Price:', size.price)
      return
    }
    
    const max = Number(size.stock || 0)
    if (max > 0 && quantity > max) {
      quantity = max
    }
    
    const cartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      size: size.size,
      sku: size.sku || null,
      price: price, // Use validated price
      quantity: quantity,
      image: product.images ? product.images[0] : (product.image || null),
      maxStock: size.stock,
    }
    
    // Additional validation before adding to cart
    if (isNaN(cartItem.price) || isNaN(cartItem.quantity)) {
      console.error('❌ Invalid cart item data:', cartItem)
      return
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem })
    setNotificationItem(cartItem)
    setShowCartNotification(true)
    setTimeout(() => {
      setShowCartNotification(false)
      setNotificationItem(null)
    }, 3000)
  }

  const updateQuantity = (id, size, quantity) => {
    // Validate quantity
    const validQuantity = Math.max(1, Math.floor(Number(quantity) || 1))
    
    if (validQuantity <= 0) {
      removeFromCart(id, size)
      return
    }
    
    // Check stock limits if available
    const item = state.items.find(item => item.id === id && item.size === size)
    if (item && item.maxStock && validQuantity > item.maxStock) {
      // Don't update if quantity exceeds stock
      return
    }
    
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity: validQuantity } })
  }

  const removeFromCart = (id, size) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = Number(item.price || 0)
      const quantity = Number(item.quantity || 0)
      const itemTotal = price * quantity
      
      // Debug logging for NaN issues
      if (isNaN(itemTotal)) {
        console.error('❌ NaN detected in cart calculation:', {
          item: item.name,
          price: item.price,
          quantity: item.quantity,
          calculatedTotal: itemTotal
        })
      }
      
      return total + itemTotal
    }, 0)
  }
  
  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + Number(item.quantity || 0), 0)
  }
  
  const getCartSavings = () => {
    // Currently no discounts applied, but can be extended for coupons, bulk discounts, etc.
    return 0
  }

  const value = {
    items: state.items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartSavings,
    showCartNotification,
    setShowCartNotification,
    notificationItem
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
