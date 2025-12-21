# 👕 ApparelDesk Project
### ERP-Integrated Apparel Commerce System

ApparelDesk is a modular, ERP-driven apparel management platform that combines a modern customer shopping experience with a full backend business workflow system inspired by Odoo-style ERP design.

Unlike traditional e-commerce applications, ApparelDesk focuses on sales-to-cash automation, inventory accuracy, financial traceability, and admin operational control, all backed by a relational database.

---

## 🎯 Project Objective

To replace:
- Manual billing
- Excel-based stock tracking
- Disconnected shopping & accounting systems

with a single, centralized, real-time ERP-backed application for apparel businesses.

---

## 🧠 Core Philosophy

**ERP-first design, UI second.**
Every customer action triggers a business document in the backend.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Customer UI (Shop / Cart / Checkout)] --> B[Express Backend (ERP Business Logic)]
    B --> C[PostgreSQL (Single Source of Truth)]
    C --> B
    B --> D[Admin ERP Dashboard (Operations & Reports)]
```

- **Customer UI**: Shop, Cart, Checkout
- **Backend**: Express.js (ERP Logic)
- **Database**: PostgreSQL (Single Source of Truth)
- **Admin Dashboard**: Operations & Reports

---

## 🛠️ Technology Stack

### Frontend
- **React.js (Vite)**
- **Tailwind CSS**
- **Lucide Icons**

### Backend
- **Node.js**
- **Express.js**

### Database
- **PostgreSQL** (Relational, ACID-compliant)

### ORM
- **Prisma** (Type-safe models & migrations)

### Authentication
- **JWT** (JSON Web Tokens)
- **bcrypt** password hashing
- **Role-based access** (Admin / Customer)

---

## 📌 Traceability Table (Features → Modules)

| Feature / API / Page | Module |
| :--- | :--- |
| Login / Signup | Authentication |
| `POST /auth/signup` | Auth APIs |
| `POST /auth/login` | Auth APIs |
| Role enforcement | Security |
| Landing Page | Customer UI |
| Shop Page | Product Sales |
| Category Filtering | Product Catalog |
| Cart Management | Sales |
| Coupon Validation | Discount Engine |
| Checkout | Order-to-Cash |
| Sale Order Creation | Sales |
| Invoice Generation | Accounting |
| Payment Recording | Accounting |
| Stock Deduction | Inventory |
| Admin Dashboard | ERP Dashboard |
| Product CRUD | Product Management |
| Published / Draft Products | ERP Visibility Rules |
| Sales Reports | Reporting |
| Low Stock Alerts | Inventory Intelligence |

---

## 👤 Authentication Module

### Features
- Customer signup
- Secure login
- Password hashing (bcrypt)
- JWT-based session handling
- Backend-enforced roles

### Behavior
- Customers cannot self-register as Admin
- JWT required for checkout & admin access

---

## 🛍️ Customer Portal Modules

### 1️⃣ Landing Page
- Fashion-brand inspired UI (Meesho / Zara style)
- Editorial visuals
- Shared header with auth pages

### 2️⃣ Shop & Product Catalog
**Features**
- Products fetched live from PostgreSQL
- Category filtering (shirt, tshirt, kurta, etc.)
- Stock-aware visibility
- Only `published = true` products are shown

**API**
- `GET /products`

### 3️⃣ Cart Module
**Features**
- Add / remove items
- Quantity updates
- Price calculation

📌 *Cart is temporary frontend state (ERP-correct).*

### 4️⃣ Coupon & Discount Engine
**Rules Enforced**
- Expiry date
- Single-use coupons
- Customer-specific coupons
- Backend-only validation

**API**
- `POST /coupons/apply`

### 5️⃣ Checkout & Payment
**Flow**
Cart → Sale Order → Invoice → Payment → Stock Update

**APIs**
- `POST /sales/checkout`
- `POST /payments/invoice/:invoiceId`

---

## 🏢 Admin ERP Modules

### 1️⃣ Admin Dashboard
- Revenue
- Open invoices
- Active customers
- Low stock products

📌 *All metrics come from PostgreSQL.*

### 2️⃣ Product Management
**Features**
- Create / update products
- Category, price, stock
- Publish / unpublish products
- Controls customer visibility

**APIs**
- `GET /products`
- `POST /products`
- `PUT /products/:id`

### 3️⃣ Sales & Invoices
**Behavior**
- Customer checkout creates:
    - SaleOrder
    - Invoice
    - Payment record
- Admin sees real-time updates

### 4️⃣ Inventory Management
**Rules**
- Stock increases on purchases
- Stock decreases only after payment
- Prevents negative stock

---

## 🗃️ Database Design (PostgreSQL)

### Core Tables
- `User`
- `Product`
- `SaleOrder`
- `SaleOrderItem`
- `Invoice`
- `Payment`

### Guarantees
- Relational integrity
- Accurate audit trail
- ERP-grade consistency

---

## 🔁 Order-to-Cash Workflow (Core ERP Logic)

1. Admin adds & publishes product
2. Customer sees product instantly
3. Customer adds to cart & applies coupon
4. Checkout triggers:
    - SaleOrder creation
    - Invoice generation
    - Payment recording
    - Stock deduction
5. Admin dashboard updates automatically

---

## 🤖 AI-Ready Architecture (Planned)

ApparelDesk is designed to support Agentic AI workflows, including:
- AI inventory forecasting
- Smart discount recommendations
- Sales trend analysis
- Admin assistant (natural language queries)

No architectural changes required to add AI agents.

---

## 🧪 Local Setup (Developer)

### Backend
```bash
cd backend
npm install
npx prisma db push
node server.js
```

### Frontend
```bash
# In the project root (if separate frontend folder exists, cd frontend)
npm install
npm run dev
```
