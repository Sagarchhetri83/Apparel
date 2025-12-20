import { useState, useEffect } from 'react';
import { PaymentTermService } from '../../api/paymentTerms.api';
import { Plus, Check, X } from 'lucide-react';

const PaymentTerms = () => {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        early_payment_discount: false,
        discount_percentage: 0,
        discount_days: 0,
        early_pay_discount_computation: 'total', // 'total' or 'base'
        active: true
    });

    useEffect(() => {
        loadTerms();
    }, []);

    const loadTerms = async () => {
        try {
            const data = await PaymentTermService.getAll();
            setTerms(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await PaymentTermService.create(formData);
            setShowForm(false);
            setFormData({
                name: '',
                early_payment_discount: false,
                discount_percentage: 0,
                discount_days: 0,
                early_pay_discount_computation: 'total',
                active: true
            });
            loadTerms();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Payment Terms</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    New Payment Term
                </button>
            </div>

            {showForm && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Create New Payment Term</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input type="text" className="input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="early_disc" checked={formData.early_payment_discount} onChange={e => setFormData({ ...formData, early_payment_discount: e.target.checked })} className="h-4 w-4 text-blue-600 rounded" />
                            <label htmlFor="early_disc" className="text-sm text-gray-700">Early Payment Discount</label>
                        </div>

                        {formData.early_payment_discount && (
                            <div className="grid grid-cols-3 gap-4 border-l-2 border-blue-100 pl-4 py-2">
                                <div>
                                    <label className="label">Discount %</label>
                                    <input type="number" className="input" value={formData.discount_percentage} onChange={e => setFormData({ ...formData, discount_percentage: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="label">Days</label>
                                    <input type="number" className="input" value={formData.discount_days} onChange={e => setFormData({ ...formData, discount_days: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="label">Computation</label>
                                    <select className="input" value={formData.early_pay_discount_computation} onChange={e => setFormData({ ...formData, early_pay_discount_computation: e.target.value })}>
                                        <option value="total">On Total Amount</option>
                                        <option value="base">On Base Amount</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {terms.map((term) => (
                            <tr key={term.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{term.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {term.early_payment_discount
                                        ? `${term.discount_percentage}% within ${term.discount_days} days`
                                        : 'None'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {term.active ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentTerms;
