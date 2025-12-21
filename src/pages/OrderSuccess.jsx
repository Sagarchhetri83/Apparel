import { useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Printer } from 'lucide-react';
// import confetti from 'canvas-confetti';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId, invoiceId, amount } = location.state || {}; // Get data passed from checkout


    if (!orderId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">No order details found. <Link to="/" className="text-blue-600">Go Home</Link></p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h1>
                <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been confirmed.</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Order ID</span>
                        <span className="font-mono font-medium text-gray-900">#{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Invoice ID</span>
                        <span className="font-mono font-medium text-gray-900">INV-{invoiceId}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                        <span className="text-gray-900 font-medium">Amount Paid</span>
                        <span className="font-bold text-green-600 text-lg">₹{amount}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full btn btn-primary flex items-center justify-center" onClick={() => window.print()}>
                        <Printer className="h-4 w-4 mr-2" />
                        Download Invoice
                    </button>
                    <Link to="/orders" className="w-full btn btn-outline-primary flex items-center justify-center">
                        <Package className="h-4 w-4 mr-2" />
                        View My Orders
                    </Link>
                    <Link to="/shop" className="block text-sm text-gray-500 hover:text-gray-900 mt-4">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
