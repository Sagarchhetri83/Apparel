const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4001; // Changed port to avoid conflicts

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/products', require('./routes/products.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/contacts', require('./routes/contacts.routes'));
app.use('/sales', require('./routes/sales.routes'));
app.use('/purchases', require('./routes/purchases.routes'));
app.use('/invoices', require('./routes/invoices.routes'));
app.use('/payments', require('./routes/payments.routes'));
app.use('/offers', require('./routes/offers.routes'));
app.use('/coupons', require('./routes/coupons.routes'));
app.use('/reports', require('./routes/reports.routes'));
app.use('/payment-terms', require('./routes/paymentTerms.routes'));
app.use('/dashboard', require('./routes/dashboard.routes'));

app.get('/', (req, res) => {
    res.json({ status: "ApparelDesk Backend Running" });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
