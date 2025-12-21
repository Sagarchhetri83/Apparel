import { useState, useEffect } from 'react';
import { ShoppingCart, FileText, Users, Package, TrendingUp, CreditCard, Award } from 'lucide-react';
import { DashboardService } from '../../api/dashboard.api';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatCard from '../../components/dashboard/StatCard';
import ActivityList from '../../components/dashboard/ActivityList';
import InsightCard from '../../components/dashboard/InsightCard';

const Dashboard = () => {
    const [data, setData] = useState({
        totalSales: 0,
        openInvoices: 0,
        activeCustomers: 0,
        lowStockCount: 0,
        recentSales: [],
        invoiceStats: { paid: 0, pending: 0, overdue: 0 },
        avgOrderValue: 0,
        paymentSuccessRate: 0,
        topCategory: { category: '-', count: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const token = localStorage.getItem('apparel_token');
                if (!token) return;

                const result = await DashboardService.getSummary(token);
                setData(result);
            } catch (error) {
                console.error('Failed to load dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
                <div className="grid grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
                </div>
                <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Dashboard"
                subtitle="Real-time business overview"
            />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={formatCurrency(data.totalSales)}
                    icon={ShoppingCart}
                    color="text-blue-600"
                    trend={12}
                />
                <StatCard
                    label="Open Invoices"
                    value={data.openInvoices}
                    icon={FileText}
                    color="text-yellow-600"
                    trend={-5}
                />
                <StatCard
                    label="Active Customers"
                    value={data.activeCustomers}
                    icon={Users}
                    color="text-green-600"
                    trend={8}
                />
                <StatCard
                    label="Low Stock Items"
                    value={data.lowStockCount || 0}
                    icon={Package}
                    color="text-red-600"
                    trend={0}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Recent Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <ActivityList activities={data.recentSales} />

                    {/* Invoice Status Breakdown (Simple Visual) */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Invoice Status</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">Paid</span>
                                    <span className="text-gray-900 font-bold">{data.invoiceStats?.paid || 0}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(data.invoiceStats?.paid / (data.totalSales > 0 ? 10 : 1)) * 10}%` }}></div>
                                    {/* Mock calculation for bar width purely visual as total invoices not available in raw count easily here without sum */}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">Pending</span>
                                    <span className="text-gray-900 font-bold">{data.invoiceStats?.pending || 0}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Insights */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Quick Insights</h3>

                    <InsightCard
                        title="Top Category"
                        value={data.topCategory?.category || 'N/A'}
                        subtitle={`${data.topCategory?.count || 0} units sold`}
                        icon={TrendingUp}
                    />
                    <InsightCard
                        title="Avg. Order Value"
                        value={formatCurrency(data.avgOrderValue || 0)}
                        subtitle="Across all paid orders"
                        icon={CreditCard}
                    />
                    <InsightCard
                        title="Payment Success"
                        value={`${data.paymentSuccessRate || 0}%`}
                        icon={Award}
                    />

                    {/* Quick Action Widget */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                        <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                        <p className="text-blue-100 text-sm mb-4">Check our documentation or contact support for assistance.</p>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold w-full hover:bg-blue-50 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
