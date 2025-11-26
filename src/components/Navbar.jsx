import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const { count } = useCart()

  return (
    <header style={{background:'#fff',borderBottom:'1px solid #eef2f7'}}>
      <div style={{maxWidth:1000,margin:'0 auto',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
        <Link to="/" style={{fontWeight:800,fontSize:18,color:'#111'}}>ShopMVP</Link>

        <nav style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/" style={{padding:'8px 12px',borderRadius:10,color:'#374151',textDecoration:'none'}}>Products</Link>
          <Link to="/cart" style={{padding:'8px 12px',borderRadius:10,background:'#f1f5f9',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8}}>
            Cart
            <span style={{background:'#2563eb',color:'#fff',width:26,height:26,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:999,fontSize:13}}>{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
