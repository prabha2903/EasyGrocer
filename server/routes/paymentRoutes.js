const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,        
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create an order
router.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body; // amount in smallest unit (e.g., 1000 paise = ₹10)

    try {
        const options = {
            amount: amount,
            currency: currency || 'INR',
        };
        const order = await razorpay.orders.create(options);
        res.json(order); // Send order details to frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
