import React from 'react'

export default function ProductCard({ id, name, price, imageUrl, onDelete, onEdit, onAddToCart }){
  const placeholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23f8fafc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='28' fill='%2394a3b8'>No image</text></svg>"

  const handleImgError = (e) => {
    if (e?.target) e.target.src = placeholder
  }

  return (
    <div style={{borderRadius:12,overflow:'hidden',background:'#fff',boxShadow:'0 6px 18px rgba(15,23,42,0.06)',display:'flex',flexDirection:'column'}}>
      <img
        src={imageUrl || placeholder}
        alt={name}
        onError={handleImgError}
        style={{width:'100%',height:150,objectFit:'cover',display:'block'}}
      />

      <div style={{padding:12,display:'flex',flexDirection:'column',gap:8}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0,fontSize:16,lineHeight:1.1}}>{name}</h3>
          <div style={{background:'linear-gradient(90deg,#34d399,#06b6d4)',color:'#fff',padding:'6px 10px',borderRadius:999,fontWeight:700,fontSize:13}}>${Number(price).toFixed(2)}</div>
        </div>

        <div style={{display:'flex',gap:8,justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:8}}>
            <button onClick={() => { console.log('ProductCard: Add clicked', id); onAddToCart && onAddToCart({ id, name, price, imageUrl }) }} style={{padding:'8px 12px',borderRadius:10,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>Add to cart</button>
            <button onClick={() => onEdit && onEdit({ id, name, price, imageUrl })} style={{padding:'8px 12px',borderRadius:10,border:'1px solid #e6eefb',background:'transparent',color:'#111',cursor:'pointer'}}>Edit</button>
          </div>

          <button onClick={() => onDelete && onDelete(id)} style={{padding:'6px 10px',borderRadius:8,border:'none',background:'#ef4444',color:'#fff',cursor:'pointer'}}>Delete</button>
        </div>
      </div>
    </div>
  )
}
