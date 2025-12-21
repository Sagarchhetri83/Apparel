import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { CouponService } from '../../api/coupons.api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CouponBox = () => {
    const { applyCoupon, coupon, cartTotal } = useCart();
    const { user } = useAuth();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleApply = async (e) => {
        e.preventDefault();
        if (!code) return;

        // Ensure user is logged in if coupons require it (though API might just check code validity)
        // But the Contact ID usually needed for usage tracking
        const contactId = user ? user.contactId || user.id : null;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await CouponService.apply(code, contactId);
            applyCoupon(result);
            setSuccess(`Coupon applied! You saved ${result.discount_percent}%`);
        } catch (err) {
            setError(err.message || 'Invalid coupon code');
            applyCoupon(null);
        } finally {
            setLoading(false);
        }
    };

    if (coupon) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-green-700">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium text-sm">
                        Code <strong>{coupon.code}</strong> applied ({coupon.discount_percent}% off)
                    </span>
                </div>
                <button
                    onClick={() => { applyCoupon(null); setCode(''); setSuccess(''); }}
                    className="text-green-600 hover:text-green-800 p-1"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Tag className="h-4 w-4 mr-2 text-gray-400" />
                Have a coupon?
            </h3>
            <form onSubmit={handleApply} className="flex space-x-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 input text-sm uppercase"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn btn-sm btn-outline-primary"
                    disabled={loading || !code}
                >
                    {loading ? '...' : 'Apply'}
                </button>
            </form>
            {error && <p className="text-xs text-red-600 mt-2 flex items-center"><X className="h-3 w-3 mr-1" /> {error}</p>}
        </div>
    );
};

export default CouponBox;
