# ApparelDesk - ERP & E-Commerce Platform

A hackathon-ready comprehensive ERP and E-commerce solution built with React, Vite, and Tailwind CSS.
Designed with Odoo-style aesthetics and professional business UI.

## Features
- **Admin ERP Dashboard**: Manage Products, Sales, Purchases, and Invoices.
- **Customer Portal**: Storefront with Category filtering, Cart, and Checkout.
- **Mock Backend**: Service-based API layer with in-memory database (`src/api/db.js`).
- **Authentication**: Role-based access (Admin vs Customer).
- **Responsive Design**: Clean, white, professional UI.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)
- Context API (State Management)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Login Credentials**

   **Admin Portal (ERP)**
   - Email: `admin@apparel.com`
   - Password: `admin`

   **Customer Portal (Store)**
   - Email: `customer@gmail.com`
   - Password: `user`

## Project Structure
- `src/api`: Mock services and database.
- `src/components`: Reusable UI components.
- `src/context`: Auth and Cart state.
- `src/layouts`: Admin and Portal layouts.
- `src/pages`: Application pages.

## Hackathon Notes
- All data is in-memory. Refreshing the page may reset data if defined in `db.js` (currently `db.js` is static but modifications in memory persist until reload).
- "Download Invoice" simulates a PDF generation action.
- Payment integration is simulated.
