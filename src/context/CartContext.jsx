import React, { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(null)

export function useCart(){
  return useContext(CartContext)
}

export function CartProvider({ children }){
  const [cart, setCart] = useState([]) // { product: {id,name,price,imageUrl}, qty }

  const addToCart = (product, qty = 1) => {
    console.log('addToCart called with', product, 'qty', qty)
    setCart(c => {
      const found = c.find(i => i.product.id === product.id)
      if(found){
        return c.map(i => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [{ product, qty }, ...c]
    })
  }

  const removeFromCart = (productId) => setCart(c => c.filter(i => i.product.id !== productId))

  const updateQuantity = (productId, qty) => setCart(c => c.map(i => i.product.id === productId ? { ...i, qty: Math.max(1, qty) } : i))

  const clearCart = () => setCart([])

  const count = useMemo(() => cart.reduce((s,i) => s + i.qty, 0), [cart])
  const total = useMemo(() => cart.reduce((s,i) => s + i.qty * (i.product.price || 0), 0), [cart])

  const value = { cart, addToCart, removeFromCart, updateQuantity, clearCart, count, total }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContext
