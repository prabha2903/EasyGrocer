import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       // From .env
  key_secret: process.env.RAZORPAY_KEY_SECRET, // From .env
});

// ✅ Create Razorpay order
router.post("/online", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    // Razorpay expects amount in **paise** (multiply by 100 if coming in rupees)
    const orderOptions = {
      amount: amount, // amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);
    console.log("Razorpay Order Created:", order);
    res.json(order);
  } catch (err) {
    console.error("🔥 Razorpay Order Error:", err); // log actual error
    res.status(500).json({ error: err.message });
  }
});

// ✅ Verify payment
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.json({ status: "Payment verified" });
    } else {
      return res.status(400).json({ status: "Payment verification failed" });
    }
  } catch (err) {
    console.error("🔥 Razorpay Verification Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
