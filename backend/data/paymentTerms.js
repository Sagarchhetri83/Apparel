const paymentTerms = [
    {
        id: 1,
        name: "Immediate Payment",
        early_payment_discount: false,
        discount_percentage: 0,
        discount_days: 0,
        early_pay_discount_computation: "total",
        active: true
    },
    {
        id: 2,
        name: "15 Days (2% Cash Disc)",
        early_payment_discount: true,
        discount_percentage: 2,
        discount_days: 15,
        early_pay_discount_computation: "total",
        active: true
    }
];

module.exports = paymentTerms;
