import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const PortalLayout = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                                Apparel<span className="text-blue-600">Desk</span>
                            </Link>
                            <nav className="hidden md:ml-10 md:flex md:space-x-8">
                                <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/shop" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                                {user && (
                                    <Link to="/orders" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">My Orders</Link>
                                )}
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-gray-900">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="relative flex items-center space-x-3">
                                    <div className="md:block hidden text-right">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">Customer</p>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600" title="Logout">
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="btn btn-primary">
                                    Login
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <button
                                className="md:hidden p-2 text-gray-500"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
                            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Shop</Link>
                            {user && <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">My Orders</Link>}
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; 2025 ApparelDesk. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PortalLayout;
