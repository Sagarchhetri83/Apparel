import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import CartItem from '../../components/cart/CartItem';
import CouponBox from '../../components/cart/CouponBox';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, discountAmount, finalTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="btn btn-primary px-8">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                    <ShoppingBag className="h-6 w-6 mr-2" />
                    Shopping Cart ({cart.length} items)
                </h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div className="lg:col-span-8">
                        <div className="bg-white border-t border-gray-200">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/shop" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                            <dl className="space-y-4 text-sm">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">₹{cartTotal}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-gray-600">Shipping Estimate</dt>
                                    <dd className="font-medium text-green-600">Free</dd>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex items-center justify-between text-green-600">
                                        <dt className="font-medium">Coupon Discount</dt>
                                        <dd className="font-bold">- ₹{discountAmount.toFixed(2)}</dd>
                                    </div>
                                )}
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-bold text-gray-900">Order Total</dt>
                                    <dd className="text-xl font-bold text-gray-900">₹{finalTotal.toFixed(2)}</dd>
                                </div>
                            </dl>

                            <CouponBox />

                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full btn btn-primary py-3 text-base shadow-lg"
                                >
                                    Proceed to Checkout
                                </button>
                                <p className="mt-3 text-xs text-center text-gray-500">
                                    Secure Checkout. 100% Authentic products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
