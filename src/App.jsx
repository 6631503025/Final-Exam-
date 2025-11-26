import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import Navbar from './components/Navbar'
import ProductListPage from './pages/ProductListPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App(){
  return (
    <ProductsProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <div style={{maxWidth:1000,margin:'24px auto',padding:'0 16px'}}>
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </ProductsProvider>
  )
}
