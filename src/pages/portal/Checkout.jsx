import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SalesService } from '../../api/sales.api';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, finalTotal, clearCart, coupon } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState({
        street: user?.address?.street || '123 Main St',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.pincode || ''
    });

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create Sale Order
            await SalesService.createOrder({
                customer_id: user.id, // backend user id is 1 or 2, matches contact id roughly
                amount_total: finalTotal,
                lines: cart.map(item => ({
                    product_id: item.id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    price_unit: item.sales_price,
                    price_subtotal: item.sales_price * item.quantity
                })),
                shipping_address: address,
                coupon_code: coupon ? coupon.code : null
            });

            setSuccess(true);
            clearCart();

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/orders');
            }, 3000);

        } catch (error) {
            console.error(error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500">Your order has been confirmed.</p>
                <p className="text-sm text-gray-400 mt-2">Redirecting to orders...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

                <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-6 md:p-8">
                        <form onSubmit={handlePayment}>
                            <div className="mb-8">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    <div className="sm:col-span-2">
                                        <label className="label">Street Address</label>
                                        <input type="text" className="input" required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">City</label>
                                        <input type="text" className="input" required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">State</label>
                                        <input type="text" className="input" required value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">ZIP / Postal Code</label>
                                        <input type="text" className="input" required value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8 border-t border-gray-200 pt-8">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="label">Card Number</label>
                                        <input type="text" className="input" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Expiration</label>
                                            <input type="text" className="input" placeholder="MM/YY" defaultValue="12/28" />
                                        </div>
                                        <div>
                                            <label className="label">CVC</label>
                                            <input type="text" className="input" placeholder="123" defaultValue="123" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-6">
                                    <span>Total to Pay</span>
                                    <span>₹{finalTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : `Pay ₹${finalTotal.toFixed(2)}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
