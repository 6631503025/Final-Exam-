import React from 'react'

export default function CartItem({ item, onRemove, onUpdate }){
  if(!item || !item.product) return null

  const { product, qty } = item

  return (
    <div style={{display:'flex',gap:12,alignItems:'center',padding:12,background:'#fff',borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.04)'}}>
      <img src={product.imageUrl} alt={product.name} style={{width:96,height:72,objectFit:'cover',borderRadius:8}} />

      <div style={{flex:1,display:'flex',flexDirection:'column',gap:6}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontWeight:700}}>{product.name}</div>
          <div style={{fontWeight:800}}>${(product.price * qty).toFixed(2)}</div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <input type="number" min={1} value={qty} onChange={e => onUpdate && onUpdate(product.id, Math.max(1, Number(e.target.value || 1)))} style={{width:80,padding:8,borderRadius:8,border:'1px solid #eef2f7'}} />
          <button onClick={() => onRemove && onRemove(product.id)} style={{marginLeft:'auto',padding:'8px 10px',borderRadius:8,border:'none',background:'#ef4444',color:'#fff',cursor:'pointer'}}>Remove</button>
        </div>
      </div>
    </div>
  )
}
