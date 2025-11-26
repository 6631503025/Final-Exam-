import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage(){
  const { cart, total, clearCart } = useCart()
  const { removeProductsByIds } = useProducts()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name.trim() || !email.includes('@') || !address.trim()){
      setError('Please fill name, valid email, and address')
      return
    }
    // simulate order
    alert(`Order placed! Total: $${total.toFixed(2)}`)
    // remove purchased products from product list
    try{
      const ids = cart.map(i => i.product.id)
      if(ids.length) removeProductsByIds(ids)
    }catch(err){
      console.error('Unable to remove products after purchase', err)
    }
    clearCart()
    nav('/')
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16}}>
      <form onSubmit={handleSubmit} style={{padding:16,background:'#fff',borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.04)'}}>
        <h3>Checkout</h3>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8,borderRadius:8,border:'1px solid #eef2f7',marginBottom:8}} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:8,borderRadius:8,border:'1px solid #eef2f7',marginBottom:8}} />
        <textarea placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} style={{width:'100%',padding:8,borderRadius:8,border:'1px solid #eef2f7',height:100}} />
        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}
        <div style={{marginTop:12}}>
          <button type="submit" style={{padding:'10px 12px',borderRadius:10,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Place order</button>
        </div>
      </form>

      <aside style={{padding:16,background:'#fff',borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.04)'}}>
        <h4>Summary</h4>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {cart.map(i => (
            <div key={i.product.id} style={{display:'flex',justifyContent:'space-between'}}>
              <div>{i.product.name} x{i.qty}</div>
              <div>${(i.product.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:12,fontWeight:800}}> <div>Total</div> <div>${total.toFixed(2)}</div></div>
      </aside>
    </div>
  )
}
