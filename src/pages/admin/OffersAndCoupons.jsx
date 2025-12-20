import { useState, useEffect } from 'react';
import { OfferService } from '../../api/offers.api';
import { CouponService } from '../../api/coupons.api';
import { Plus, Tag } from 'lucide-react';

const OffersAndCoupons = () => {
    const [offers, setOffers] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [activeTab, setActiveTab] = useState('offers'); // 'offers' or 'coupons'

    // Forms
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [showGenForm, setShowGenForm] = useState(false);

    const [offerData, setOfferData] = useState({ name: '', discount_percentage: 10, start_date: '', end_date: '', available_on: 'website' });
    const [genData, setGenData] = useState({ offerId: '', quantity: 1, validUntil: '', contactId: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [offersData, couponsData] = await Promise.all([
                OfferService.getAll(),
                CouponService.getAll()
            ]);
            setOffers(offersData);
            setCoupons(couponsData);
            if (offersData.length > 0 && !genData.offerId) {
                setGenData(prev => ({ ...prev, offerId: offersData[0].id }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateOffer = async (e) => {
        e.preventDefault();
        try {
            await OfferService.create(offerData);
            setShowOfferForm(false);
            loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenerateCoupons = async (e) => {
        e.preventDefault();
        try {
            await CouponService.generate(genData);
            setShowGenForm(false);
            loadData();
            setActiveTab('coupons');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Offers & Coupons</h1>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button onClick={() => setActiveTab('offers')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'offers' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Discount Offers
                    </button>
                    <button onClick={() => setActiveTab('coupons')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'coupons' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Coupons
                    </button>
                </nav>
            </div>

            {/* OFFERS TAB */}
            {activeTab === 'offers' && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button onClick={() => setShowOfferForm(!showOfferForm)} className="btn btn-primary">
                            <Plus className="h-4 w-4 mr-2" /> New Offer
                        </button>
                    </div>

                    {showOfferForm && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <form onSubmit={handleCreateOffer} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Offer Name</label>
                                        <input type="text" className="input" required value={offerData.name} onChange={e => setOfferData({ ...offerData, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">Discount %</label>
                                        <input type="number" className="input" required value={offerData.discount_percentage} onChange={e => setOfferData({ ...offerData, discount_percentage: Number(e.target.value) })} />
                                    </div>
                                    <div>
                                        <label className="label">Start Date</label>
                                        <input type="date" className="input" required value={offerData.start_date} onChange={e => setOfferData({ ...offerData, start_date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">End Date</label>
                                        <input type="date" className="input" required value={offerData.end_date} onChange={e => setOfferData({ ...offerData, end_date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="btn btn-primary">Save Offer</button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {offers.map((offer) => (
                                    <tr key={offer.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{offer.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.discount_percentage}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{offer.start_date} to {offer.end_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => { setShowGenForm(true); setGenData(prev => ({ ...prev, offerId: offer.id })); }}
                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center justify-end"
                                            >
                                                <Tag className="h-4 w-4 mr-1" /> Generate Coupons
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Generate Form Modal equivalent */}
                    {showGenForm && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h3 className="text-lg font-bold mb-4">Generate Coupons</h3>
                                <form onSubmit={handleGenerateCoupons} className="space-y-4">
                                    <div>
                                        <label className="label">Quantity</label>
                                        <input type="number" className="input" min="1" value={genData.quantity} onChange={e => setGenData({ ...genData, quantity: Number(e.target.value) })} />
                                    </div>
                                    <div>
                                        <label className="label">Valid Until</label>
                                        <input type="date" className="input" required value={genData.validUntil} onChange={e => setGenData({ ...genData, validUntil: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="label">Limit to Customer ID (Optional)</label>
                                        <input type="number" className="input" placeholder="e.g. 2" value={genData.contactId} onChange={e => setGenData({ ...genData, contactId: e.target.value })} />
                                    </div>
                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button type="button" onClick={() => setShowGenForm(false)} className="btn btn-secondary">Cancel</button>
                                        <button type="submit" className="btn btn-primary">Generate</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* COUPONS TAB */}
            {activeTab === 'coupons' && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {coupons.map((coupon) => (
                                <tr key={coupon.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-blue-600">{coupon.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Offer #{coupon.offer_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.expiration_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${coupon.status === 'unused' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {coupon.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OffersAndCoupons;
