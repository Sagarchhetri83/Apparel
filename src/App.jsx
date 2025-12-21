import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './layouts/AdminLayout';
import PortalLayout from './layouts/PortalLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ComingSoon from './components/ComingSoon';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';
import SalesList from './pages/admin/SalesList';
import PaymentTerms from './pages/admin/PaymentTerms';
import OffersAndCoupons from './pages/admin/OffersAndCoupons';

// Placeholder modules
import PurchaseList from './pages/admin/PurchaseList';
const InvoiceList = () => <ComingSoon title="Invoices" />;
const PaymentList = () => <ComingSoon title="Payments" />;
import UsersAndContacts from './pages/admin/UsersAndContacts';
const Reports = () => <ComingSoon title="Reports" />;

// Portal Pages
import Landing from './pages/Landing'; // Changed from PortalHome
import PortalShop from './pages/portal/Shop';
import PortalCart from './pages/portal/Cart';
import PortalCheckout from './pages/portal/Checkout';
import PortalOrders from './pages/portal/OrderList';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="internal">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="sales" element={<SalesList />} />
            <Route path="purchases" element={<PurchaseList />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="payments" element={<PaymentList />} />
            <Route path="payment-terms" element={<PaymentTerms />} />
            <Route path="contacts" element={<UsersAndContacts />} />
            <Route path="offers" element={<OffersAndCoupons />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Portal Routes */}
          <Route path="/" element={<PortalLayout />}>
            <Route index element={<Landing />} />
            <Route path="shop" element={<PortalShop />} />
            <Route path="cart" element={<PortalCart />} />
            <Route path="checkout" element={
              <ProtectedRoute>
                <PortalCheckout />
              </ProtectedRoute>
            } />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="orders" element={
              <ProtectedRoute>
                <PortalOrders />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
