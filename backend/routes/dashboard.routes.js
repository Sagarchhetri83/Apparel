const express = require('express');
const router = express.Router();
const DashboardService = require('../services/dashboard.service');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

// GET /dashboard/summary
// Protected: Internal/Admin only
router.get('/summary', authMiddleware, roleMiddleware(['admin', 'internal']), async (req, res) => {
    try {
        const data = await DashboardService.getSummary();
        res.json({ success: true, data });
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
