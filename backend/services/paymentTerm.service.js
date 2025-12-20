const paymentTerms = require('../data/paymentTerms');

const PaymentTermService = {
    calculateDiscount: (termId, invoiceDate, paymentDate, amount, tax) => {
        const term = paymentTerms.find(t => t.id === Number(termId));
        if (!term || !term.active || !term.early_payment_discount) {
            return { discountApplied: false, discountedAmount: 0, message: "No discount applicable" };
        }

        const invDate = new Date(invoiceDate);
        const payDate = new Date(paymentDate);

        // Calculate difference in days
        const diffTime = Math.abs(payDate - invDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= term.discount_days) {
            // Calculate discount base
            const base = term.early_pay_discount_computation === 'total' ? (amount + tax) : amount;
            const discount = (base * term.discount_percentage) / 100;

            return {
                discountApplied: true,
                discountedAmount: discount,
                message: `Early Payment Discount of ${term.discount_percentage}% applied`
            };
        }

        return { discountApplied: false, discountedAmount: 0, message: "Early payment period expired" };
    }
};

module.exports = PaymentTermService;
