import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState(null);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
        setCoupon(null);
    };

    const applyCoupon = (couponData) => {
        setCoupon(couponData);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.sales_price * item.quantity), 0);

    // Calculate discount
    let discountAmount = 0;
    if (coupon) {
        // Simplifying: assuming coupon is linked to an offer with percentage
        // In real app we would check offer details. 
        // Using a fixed mock logic for now or we can pass the discount percentage in couponData
        discountAmount = (cartTotal * (coupon.discount_percent || 10)) / 100;
    }

    const finalTotal = cartTotal - discountAmount;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            coupon,
            applyCoupon,
            cartTotal,
            discountAmount,
            finalTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
