import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    FileText,
    CreditCard,
    Users,
    Settings,
    LogOut,
    Package
} from 'lucide-react';
import clsx from 'clsx';

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/products', icon: Package, label: 'Products' },
        { to: '/admin/sales', icon: ShoppingCart, label: 'Sales' },
        { to: '/admin/purchases', icon: ShoppingBag, label: 'Purchases' },
        { to: '/admin/invoices', icon: FileText, label: 'Invoices' },
        { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
        { to: '/admin/payment-terms', icon: Settings, label: 'Payment Terms' },
        { to: '/admin/offers', icon: Package, label: 'Offers & Coupons' },
        { to: '/admin/contacts', icon: Users, label: 'Contacts' },
        { to: '/admin/reports', icon: FileText, label: 'Reports' }, // Reusing icon for now
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-border flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="text-xl font-bold text-gray-800">ApparelDesk</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => clsx(
                                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user?.name?.[0] || 'A'}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
