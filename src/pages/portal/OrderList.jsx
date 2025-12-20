import { useState, useEffect } from 'react';
import { SalesService } from '../../api/sales.api';
import { useAuth } from '../../context/AuthContext';
import { FileText } from 'lucide-react';

const OrderList = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadOrders();
        }
    }, [user]);

    const loadOrders = async () => {
        try {
            const data = await SalesService.getMyOrders(user.id);
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const downloadInvoice = (orderId) => {
        alert(`Downloading invoice for Order #${orderId}... (Mock PDF)`);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Orders</h1>

                {loading ? (
                    <div className="text-center py-10">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                        No orders found.
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <li key={order.id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-blue-600 truncate">
                                                {order.name}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.state === 'sale' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.state === 'sale' ? 'Confirmed' : order.state}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    {new Date(order.date).toLocaleDateString()}
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    Total: <span className="font-medium text-gray-900 ml-1">₹{order.amount_total.toFixed(2)}</span>
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm sm:mt-0">
                                                <button
                                                    onClick={() => downloadInvoice(order.id)}
                                                    className="flex items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <FileText className="h-4 w-4 mr-1" />
                                                    Download Invoice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;
