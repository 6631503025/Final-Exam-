import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import { useCart } from '../context/CartContext'

const SAMPLE = [
  { id: 'p1', name: 'Laptop Pro', price: 1299.99, imageUrl: new URL('../assets/laptop.svg', import.meta.url).href },
  { id: 'p2', name: 'Wireless Mouse', price: 49.99, imageUrl: new URL('../assets/mouse.svg', import.meta.url).href },
  { id: 'p3', name: 'Mechanical Keyboard', price: 119.99, imageUrl: new URL('../assets/keyboard.svg', import.meta.url).href },
  { id: 'p4', name: 'Headphones', price: 199.99, imageUrl: new URL('../assets/headphone.svg', import.meta.url).href }
]

export default function ProductListPage(){
  const [products, setProducts] = useState(SAMPLE)
  const [editing, setEditing] = useState(null)
  const { addToCart } = useCart()

  const handleAdd = (product) => {
    setProducts(p => [{ ...product, id: product.id || `p${Date.now()}` }, ...p])
  }

  const handleEdit = (prod) => {
    setProducts(p => p.map(x => x.id === prod.id ? prod : x))
    setEditing(null)
  }

  const handleDelete = (id) => setProducts(p => p.filter(x => x.id !== id))

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:18,alignItems:'start'}}>
      <div>
        <h2 style={{marginTop:0}}>Products</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
          {products.map(p => (
            <ProductCard
              key={p.id}
              {...p}
              onDelete={handleDelete}
              onEdit={() => setEditing(p)}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      </div>

      <div>
        <ProductForm initial={editing} onSubmit={(prod) => prod.id && products.some(p => p.id === prod.id) ? handleEdit(prod) : handleAdd(prod)} />
      </div>
    </div>
  )
}
