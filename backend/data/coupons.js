const coupons = [
    {
        id: 1,
        code: "WELCOME10",
        expiration_date: "2025-12-31",
        status: "unused",
        offer_id: 1,
        contact_id: null,
        discount_percent: 10
    },
    {
        id: 2,
        code: 'SAVE10',
        offer_id: 1,
        expiration_date: '2025-12-31',
        status: 'unused',
        contact_id: null,
        discount_percent: 10
    }
];

module.exports = coupons;
