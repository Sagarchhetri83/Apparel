const coupons = require('../data/coupons');

const CouponService = {
    validateAndApply: (code, contactId) => {
        const coupon = coupons.find(c => c.code === code);

        if (!coupon) {
            throw new Error('Invalid coupon code');
        }

        if (coupon.status === 'used') {
            throw new Error('Coupon already used');
        }

        // Date check (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0];
        if (coupon.expiration_date && coupon.expiration_date < today) {
            throw new Error('Coupon expired');
        }

        if (coupon.contact_id && Number(coupon.contact_id) !== Number(contactId)) {
            throw new Error('Coupon valid for another customer only.');
        }

        // Note: We don't mark as used here immediately unless checkout confirms it.
        // For validation phase (Cart), we just return valid.
        // Use 'markAsUsed' for final checkout.

        return {
            valid: true,
            coupon
        };
    },

    markAsUsed: (code) => {
        const coupon = coupons.find(c => c.code === code);
        if (coupon) {
            coupon.status = 'used';
        }
    },

    generate: (offerId, count, validUntil, contactId = null) => {
        const newCoupons = [];
        for (let i = 0; i < count; i++) {
            // Simple random code generation
            const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
            newCoupons.push({
                // IDs generated in route or here. Let's do partial object here
                code: `OFFER-${offerId}-${randomString}`,
                offer_id: Number(offerId),
                expiration_date: validUntil,
                status: 'unused',
                contact_id: contactId ? Number(contactId) : null
            });
        }
        return newCoupons;
    }
};

module.exports = CouponService;
