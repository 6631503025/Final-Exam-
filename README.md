# Shopping Cart & Checkout WebApp — Exam Submission

This README contains all required sections for the **Platform Development — Final Take-Home Examination** using the topic **Shopping Cart & Checkout Web Application (React Frontend)**.

---

## 🧩 Task 1 — System Requirement Analysis

### **1. Problem Statement**

Online small businesses often struggle to offer customers a simple and fast way to browse products and complete purchases. Many shop owners rely on chat-based orders, which leads to mistakes, slow processing, and poor user experience. Customers lack a centralized product view and must manually specify items to buy. To solve this, a lightweight web application is needed to provide product browsing, cart management, and checkout in a clean, fast interface. The system must also allow admins to manage products easily. This MVP aims to deliver a simple, fast, and usable shopping cart platform.

### **2. Core User Stories**

* As a **customer**, I want to view all products so that I can choose what to buy.
* As a **customer**, I want to add/remove items from my cart so that I can manage my selected items.
* As a **customer**, I want to checkout so that I can complete my order.
* As an **admin**, I want to create, update, and delete products so that I can manage the product list.
* As an **admin**, I want to view the list of all products so that I can maintain inventory.

### **3. Non-Functional Requirements**

* The system must load product data within **2 seconds**.
* The UI must be responsive and usable on both desktop and mobile.
* The system must prevent unauthorized edits to product data.

### **4. Key Risks & Threats**

* Data loss if product storage is not backed up.
* Unauthorized access to admin functions.
* Invalid input causing inconsistent product or cart data.

---

## 🛡️ Task 2 — Security & PDPA Compliance

### **1. Relevant OWASP Top 10 Risks + Mitigations**

**A. Broken Access Control**
Risk: Unauthorized users could modify products.
Mitigation: Protect admin API routes using token-based authentication.

**B. Injection (e.g., malformed input)**
Risk: Unvalidated fields may break functionality or cause security issues.
Mitigation: Input validation on product forms + server-side sanitization.

**C. Sensitive Data Exposure**
Risk: User checkout details (name, email, address) might leak.
Mitigation: Encrypt data in transit (HTTPS) + store only required fields.

---

### **2. PDPA Data Flow**

* **Data Collection**: name, email, address during checkout.
* **Processing**: use data to create the order.
* **Storage**: store order and product info in the database.
* **Sharing**: only shared with admin for order fulfillment.

---

### **3. Security Checklist (5 Items)**

* Input validation on all product forms.
* Password hashing at backend (for admin).
* HTTPS enabled for secure transit.
* Rate limiting to prevent brute force.
* Access logs for admin activities.

---

## 🤖 Task 3 — AI-Assisted System Design

### **1. AI Prompt Used**

> "Design a simple shopping-cart-and-checkout web app with Product, Cart, and Order entities. Suggest tech stack, database schema, and 3 key API endpoints."

### **2. AI Output**

#### **Recommended Tech Stack**

* Frontend: React + Vite + TailwindCSS
* Backend: Node.js + Express
* Database: SQLite or MySQL for simplicity
* Auth: JWT (Admin)

#### **Database Schema (Main Tables)**

**Products**(id, name, price, imageUrl)
**Carts**(id, userId)
**CartItems**(id, cartId, productId, qty)
**Orders**(id, userId, total, createdAt)
**OrderItems**(id, orderId, productId, qty, price)

#### **3 Key API Endpoints**

* `GET /products` — fetch all products
* `POST /cart/items` — add product to cart
* `POST /checkout` — create order from cart

### **How This Helps Development (3–5 sentences)**

The AI output provides a clear structure for building the MVP quickly. The suggested tech stack is lightweight and easy to set up. The database schema ensures all required relationships are ready for both cart and checkout flows. The API endpoints define the minimum backend required to support the React frontend. This speeds up development and reduces design errors.

---

## 🏗️ Task 4 — System Architecture & UX/UI

### **A. System Architecture Diagram**

```
[ React Frontend ] → [ Express Backend ] → [ Database ]
           ↓                ↓                   ↓
       Authentication     Logging            Storage
```

### **B. Wireframes (2 Screens)**

(You can attach hand-drawn or Figma images in the PDF)

**Screen 1 — Product List**

* Displays product cards
* Add to Cart button

**Screen 2 — Cart Page**

* List of selected items
* Quantity update
* Checkout button

---

## 💻 Task 5 — React Frontend (List + Add/Delete)

Below is the implementation for the required page.

```jsx
import React, { useState } from 'react';

export default function ProductPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 150 }
  ]);

  const [form, setForm] = useState({ name: '', price: '' });

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price)
    };

    setProducts([...products, newProduct]);
    setForm({ name: '', price: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Product List</h1>

      <div>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — {p.price} THB
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## ✔️ Completed

You may now copy this entire file into your **README.md** or export as PDF for submission.
