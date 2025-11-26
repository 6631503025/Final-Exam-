import React, { useState, useEffect } from 'react'

export default function ProductForm({ onSubmit, initial }){
  const [name, setName] = useState(initial?.name || '')
  const [price, setPrice] = useState(initial?.price ?? '')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.imageUrl || '')

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  useEffect(() => {
    // update when initial changes (edit flow)
    setName(initial?.name || '')
    setPrice(initial?.price ?? '')
    setPreview(initial?.imageUrl || '')
    setFile(null)
  }, [initial])

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) setFile(f)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = initial?.id || `p${Date.now()}`
    const imageUrl = file ? URL.createObjectURL(file) : preview || ''
    const product = { id, name: name.trim(), price: Number(price) || 0, imageUrl }
    onSubmit && onSubmit(product)
  }

  return (
    <form onSubmit={handleSubmit} style={{borderRadius:12,boxShadow:'0 6px 18px rgba(15,23,42,0.06)',background:'#fff',padding:14,display:'flex',flexDirection:'column',gap:10}}>
      <h3 style={{margin:0,fontSize:16}}>{initial ? 'Edit Product' : 'Add Product'}</h3>

      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{padding:8,borderRadius:8,border:'1px solid #eef2f7'}} />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} type="number" step="0.01" style={{padding:8,borderRadius:8,border:'1px solid #eef2f7'}} />

      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <label style={{display:'inline-block'}}>
          <input type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
          <div style={{padding:'8px 12px',borderRadius:10,background:'#f1f5f9',cursor:'pointer'}}>Choose image</div>
        </label>

        <div style={{width:150,height:150,background:'#f8fafc',borderRadius:8,overflow:'hidden',border:'1px solid #eef2f7'}}>
          {preview ? <img src={preview} alt="preview" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'#94a3b8'}}>Preview</div>}
        </div>
      </div>

      <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
        <button type="submit" style={{padding:'8px 12px',borderRadius:10,border:'none',background:'#2563eb',color:'#fff',cursor:'pointer'}}>{initial ? 'Save' : 'Add'}</button>
      </div>
    </form>
  )
}
