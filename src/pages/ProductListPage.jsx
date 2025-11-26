import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'

export default function ProductListPage(){
  const { products, addProduct, editProduct, deleteProduct } = useProducts()
  const [editing, setEditing] = useState(null)
  const { addToCart } = useCart()

  const handleAdd = (product) => addProduct(product)
  const handleEdit = (prod) => { editProduct(prod); setEditing(null) }
  const handleDelete = (id) => deleteProduct(id)

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
