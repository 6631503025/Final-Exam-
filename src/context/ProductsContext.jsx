import React, { createContext, useContext, useState } from 'react'

const ProductsContext = createContext(null)

export function useProducts(){
  return useContext(ProductsContext)
}

const SAMPLE = [
  { id: 'p1', name: 'Laptop Pro', price: 1299.99, imageUrl: new URL('../assets/laptop.svg', import.meta.url).href },
  { id: 'p2', name: 'Wireless Mouse', price: 49.99, imageUrl: new URL('../assets/mouse.svg', import.meta.url).href },
  { id: 'p3', name: 'Mechanical Keyboard', price: 119.99, imageUrl: new URL('../assets/keyboard.svg', import.meta.url).href },
  { id: 'p4', name: 'Headphones', price: 199.99, imageUrl: new URL('../assets/headphone.svg', import.meta.url).href }
]

export function ProductsProvider({ children }){
  const [products, setProducts] = useState(SAMPLE)

  const addProduct = (product) => setProducts(p => [{ ...product, id: product.id || `p${Date.now()}` }, ...p])
  const editProduct = (prod) => setProducts(p => p.map(x => x.id === prod.id ? prod : x))
  const deleteProduct = (id) => setProducts(p => p.filter(x => x.id !== id))
  const removeProductsByIds = (ids = []) => setProducts(p => p.filter(x => !ids.includes(x.id)))

  const value = { products, addProduct, editProduct, deleteProduct, removeProductsByIds }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export default ProductsContext
