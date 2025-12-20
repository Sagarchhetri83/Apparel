// In-memory mock database
// This simulates a real database. Changes here persist until page reload.

export const db = {
    users: [
        {
            id: 1,
            name: "Admin User",
            email: "admin@apparel.com",
            password: "admin",
            role: "internal",
            mobile: "9876543210",
            address: { city: "New Delhi", state: "Delhi", pincode: "110001" },
            contact_id: 1
        },
        {
            id: 2,
            name: "John Doe",
            email: "customer@gmail.com",
            password: "user",
            role: "portal",
            mobile: "9800000000",
            address: { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
            contact_id: 2
        }
    ],
    contacts: [
        {
            id: 1,
            name: "Admin User",
            type: "internal",
            email: "admin@apparel.com",
            mobile: "9876543210",
            address: "New Delhi, Delhi - 110001"
        },
        {
            id: 2,
            name: "John Doe",
            type: "customer",
            email: "customer@gmail.com",
            mobile: "9800000000",
            address: "Mumbai, Maharashtra - 400001"
        },
        {
            id: 3,
            name: "Fabric Suppliers Ltd",
            type: "vendor",
            email: "supply@fabric.com",
            mobile: "8888888888",
            address: "Surat, Gujarat"
        }
    ],
    products: [
        {
            id: 1,
            product_name: "Classic White Shirt",
            product_category: "men",
            product_type: "shirt",
            material: "Cotton",
            colors: ["White"],
            current_stock: 50,
            sales_price: 1200,
            sales_tax: 18,
            purchase_price: 800,
            purchase_tax: 12,
            published: true,
            image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 2,
            product_name: "Slim Fit Chinos",
            product_category: "men",
            product_type: "pants",
            material: "Cotton Blend",
            colors: ["Beige", "Navy"],
            current_stock: 30,
            sales_price: 1500,
            sales_tax: 18,
            purchase_price: 900,
            purchase_tax: 12,
            published: true,
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 3,
            product_name: "Designer Kurta",
            product_category: "men",
            product_type: "kurta",
            material: "Silk",
            colors: ["Yellow"],
            current_stock: 15,
            sales_price: 2500,
            sales_tax: 5,
            purchase_price: 1800,
            purchase_tax: 5,
            published: true,
            image: "https://images.unsplash.com/photo-1631617267074-722f46f55403?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 4,
            product_name: "Urban Graphic T-Shirt",
            product_category: "men",
            product_type: "tshirt",
            material: "Cotton",
            colors: ["Black"],
            current_stock: 100,
            sales_price: 600,
            sales_tax: 12,
            purchase_price: 300,
            purchase_tax: 12,
            published: true,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600"
        }
    ],
    paymentTerms: [
        {
            id: 1,
            name: "Immediate Payment",
            early_payment_discount: false,
            discount_percentage: 0,
            discount_days: 0,
            early_pay_discount_computation: "total",
            active: true
        },
        {
            id: 2,
            name: "15 Days (2% Cash Disc)",
            early_payment_discount: true,
            discount_percentage: 2,
            discount_days: 5,
            early_pay_discount_computation: "toal",
            active: true
        }
    ],
    offers: [
        {
            id: 1,
            name: "Introductory Offer",
            discount_percentage: 10,
            start_date: "2025-01-01",
            end_date: "2025-12-31",
            available_on: "website",
            coupons: []
        }
    ],
    coupons: [
        {
            id: 1,
            code: "WELCOME10",
            expiration_date: "2025-12-31",
            status: "unused",
            offer_id: 1,
            contact_id: null
        }
    ],
    sales: [],
    purchases: [],
    invoices: [],
    payments: []
};
