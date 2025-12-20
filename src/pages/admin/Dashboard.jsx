import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, FileText, Users } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Sales', value: '₹12,450', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Pending Purchases', value: '3', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Open Invoices', value: '5', icon: FileText, color: 'text-yellow-600', bg: 'bg-yellow-100' },
        { label: 'Active Customers', value: '12', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} p-3 rounded-lg`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">New Sale Order #SO00{i}</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                                <span className="ml-auto text-sm font-medium text-green-600">Confirmed</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => navigate('/admin/products')} className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                            <span className="block font-medium text-gray-900 group-hover:text-blue-700">Add Product</span>
                            <span className="text-xs text-gray-500">Create new inventory item</span>
                        </button>
                        <button onClick={() => navigate('/admin/sales')} className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                            <span className="block font-medium text-gray-900 group-hover:text-blue-700">New Sale</span>
                            <span className="text-xs text-gray-500">Create sale order</span>
                        </button>
                        <button onClick={() => navigate('/admin/purchases')} className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                            <span className="block font-medium text-gray-900 group-hover:text-blue-700">New Purchase</span>
                            <span className="text-xs text-gray-500">Order from vendor</span>
                        </button>
                        <button onClick={() => navigate('/admin/invoices')} className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
                            <span className="block font-medium text-gray-900 group-hover:text-blue-700">View Invoices</span>
                            <span className="text-xs text-gray-500">Check pending payments</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
