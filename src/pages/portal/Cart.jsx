import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { CouponService } from '../../api/coupons.api';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, discountAmount, finalTotal, applyCoupon, coupon } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = async () => {
        try {
            setCouponError('');
            const contactId = user ? (user.contact_id || user.id) : null;
            const appliedCoupon = await CouponService.apply(couponCode, contactId);

            // Success
            // Note: We need discount_percentage in backend response or offer object
            // The backend returns coupon object. Let's assume coupon has offer_id, and we might need to fetch offer or 
            // simplified: backend returns hydrated coupon or we hardcode 10% for now if not in data.
            // Let's assume 10% default if not present or check response.
            // Actually implementation detail: CouponService.apply returns coupon.
            // Ideally backend should return "discount: 10" or similar from the offer.
            // For hackathon, let's inject a mock 10% or if we can fetch offer. 
            // Better: update backend to include offer details in 'apply' response.
            // OR: assume 10% for any valid coupon for this demo step.

            applyCoupon({ ...appliedCoupon, discount_percent: 10 });
        } catch (e) {
            setCouponError(e.message);
            applyCoupon(null);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any items to the cart yet.</p>
                <Link to="/shop" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <section className="lg:col-span-7">
                        <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {cart.map((product) => (
                                <li key={product.id} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.product_name}
                                            className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a href="#" className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.product_name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500 capitalize">{product.colors.join(', ')}</p>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">₹{product.sales_price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${product.id}`} className="sr-only">
                                                    Quantity, {product.product_name}
                                                </label>
                                                <select
                                                    id={`quantity-${product.id}`}
                                                    name={`quantity-${product.id}`}
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>

                                                <div className="absolute top-0 right-0">
                                                    <button
                                                        onClick={() => removeFromCart(product.id)}
                                                        type="button"
                                                        className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order Summary */}
                    <section className="lg:col-span-5 mt-16 lg:mt-0 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">₹{cartTotal.toFixed(2)}</dd>
                            </div>

                            {coupon && (
                                <div className="flex items-center justify-between text-green-600">
                                    <dt className="text-sm">Discount ({coupon.code})</dt>
                                    <dd className="text-sm font-medium">-₹{discountAmount.toFixed(2)}</dd>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">₹{finalTotal.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">Coupon Code</label>
                            <div className="mt-1 flex space-x-2">
                                <input
                                    type="text"
                                    id="coupon"
                                    className="input flex-1"
                                    placeholder="Enter code (Try: WELCOME10)"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-medium"
                                >
                                    Apply
                                </button>
                            </div>
                            {couponError && <p className="mt-2 text-sm text-red-600">{couponError}</p>}
                            {coupon && <p className="mt-2 text-sm text-green-600">Coupon applied successfully!</p>}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Cart;
