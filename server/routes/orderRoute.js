import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/orderController.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const orderRouter = express.Router();

// 🟢 Cash on Delivery
orderRouter.post("/cod", authUser, placeOrderCOD);

// 🟢 User Orders
orderRouter.get("/user", authUser, getUserOrders);

// 🟢 Seller Orders
orderRouter.get("/seller", authSeller, getAllOrders);

// 🟢 Online Payment - Create Razorpay Order
orderRouter.post("/online", authUser, async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Online Payment - Verify Payment
orderRouter.post("/verify", authUser, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.json({ status: "Payment verified" });
    } else {
      return res.status(400).json({ status: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default orderRouter;
