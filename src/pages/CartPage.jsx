import React from 'react'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { Link, useNavigate } from 'react-router-dom'

export default function CartPage(){
  const { cart, removeFromCart, updateQuantity, total } = useCart()
  const nav = useNavigate()

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div style={{padding:16,background:'#fff',borderRadius:12}}>Your cart is empty. <Link to="/">Shop now</Link></div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {cart.map(item => (
              <CartItem key={item.product.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
            ))}
          </div>

          <div style={{padding:16,background:'#fff',borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.04)'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div className="muted">Subtotal</div>
              <div style={{fontWeight:800}}>${total.toFixed(2)}</div>
            </div>
            <div style={{marginTop:12}}>
              <button onClick={() => nav('/checkout')} style={{width:'100%',padding:'10px 12px',borderRadius:10,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
