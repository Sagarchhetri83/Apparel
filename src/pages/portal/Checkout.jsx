import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { SalesService } from '../../api/sales.api';
import { ShieldCheck, CreditCard, ShoppingBag, Loader } from 'lucide-react';

const Checkout = () => {
    const { cart, finalTotal, clearCart, coupon } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('review'); // review | paying | success
    const [error, setError] = useState('');

    if (cart.length === 0 && step === 'review') {
        navigate('/cart');
        return null; // or redirect
    }

    const handlePlaceOrder = async () => {
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } });
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Create Sale Order (Backend Validation)
            // Backend expects: { items: [{productId, quantity}] }
            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            const saleOrderResult = await SalesService.checkout(items, localStorage.getItem('apparel_token'));
            // Expected result: { saleOrder: {id...}, invoice: {id, total...} }

            const invoiceId = saleOrderResult.invoice.id;

            // 2. Process Payment immediately (Simulation for "Pay Now")
            // In real world, this button would open Stripe/Razorpay
            // Here we just call the backend payment API
            await SalesService.payInvoice(invoiceId, saleOrderResult.invoice.total, 'ONLINE', localStorage.getItem('apparel_token'));

            // 3. Success
            clearCart();
            // Assuming result contains invoice/product details, or we just pass the ID
            navigate('/order-success', {
                state: {
                    orderId: saleOrderResult.saleOrder.id,
                    invoiceId: invoiceId,
                    amount: saleOrderResult.invoice.total
                }
            });

        } catch (err) {
            console.error(err);
            setError(err.message || 'Checkout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200 p-6 bg-gray-50">
                        <h1 className="text-xl font-bold text-gray-900 flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                            Secure Checkout
                        </h1>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Address Section (Mock) */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Shipping Address</h2>
                            <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm text-gray-600">
                                <p className="font-bold text-gray-900">{user?.name || 'Guest User'}</p>
                                <p>123 Fashion Street, Silk Board</p>
                                <p>Bangalore, KA 560068</p>
                                <p className="mt-2 text-blue-600 cursor-pointer text-xs font-semibold">CHANGE ADDRESS</p>
                            </div>
                        </section>

                        {/* Order Items Review */}
                        <section>
                            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Order Items</h2>
                            <ul className="divide-y divide-gray-100 border border-gray-100 rounded">
                                {cart.map(item => (
                                    <li key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded mr-3">{item.quantity}x</span>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.product_type}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Payment Summary */}
                        <section className="border-t border-gray-100 pt-6">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                                <span>Total Amount</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6">Including all taxes and discounts</p>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full flex items-center justify-center btn btn-primary py-4 text-lg font-bold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="animate-spin h-5 w-5 mr-3" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Pay & Place Order
                                    </>
                                )}
                            </button>
                            <div className="mt-4 flex justify-center space-x-4">
                                <span className="text-gray-400 text-xs flex items-center"><ShieldCheck className="h-3 w-3 mr-1" /> SSL Secure</span>
                                <span className="text-gray-400 text-xs flex items-center"><CreditCard className="h-3 w-3 mr-1" /> Card / UPI / NetBanking</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
