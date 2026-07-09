# EasyGrocer 🛒

A full-stack MERN grocery e-commerce application with separate customer and seller experiences, secure authentication, image uploads, and online payments.

**Live Demo:** [https://easy-grocer.vercel.app](https://easy-grocer.vercel.app)

---

## Features

- 🛍️ Browse products by category, search, and view product details
- 🛒 Add to cart, manage quantities, and checkout
- 👤 Customer authentication (register/login) with secure HTTP-only cookies
- 🏪 Seller dashboard to add/manage products and view orders
- 📦 Order placement and order history (My Orders)
- 📍 Address management for delivery
- 💳 Online payments via Razorpay (and Stripe support)
- ☁️ Product image uploads via Cloudinary
- 📱 Fully responsive UI built with Tailwind CSS

---

## Tech Stack

**Frontend (`client/`)**
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

**Backend (`server/`)**
- Node.js + Express 5
- MongoDB with Mongoose
- JWT authentication (HTTP-only cookies)
- bcryptjs for password hashing
- Cloudinary for image storage
- Multer for file upload handling
- Razorpay & Stripe for payments

**Database & Hosting**
- MongoDB Atlas
- Backend hosted on **Render**
- Frontend hosted on **Vercel**

---

## Project Structure

```
EasyGrocer/
├── client/              # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   ├── .env
│   ├── vercel.json      # SPA routing config for Vercel
│   └── package.json
├── server/              # Express backend
│   ├── configs/         # DB, Cloudinary, Multer configs
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Cloudinary account
- A Razorpay account (test keys are fine for development)

### 1. Clone the repository
```bash
git clone https://github.com/prabha2903/EasyGrocer.git
cd EasyGrocer
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `server/.env` file with the following variables:

```dotenv
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development

# Admin/Seller Credentials
SELLER_EMAIL=your_seller_email
SELLER_PASSWORD=your_seller_password

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> ⚠️ If your MongoDB password contains special characters (`@ # % / : ? &`), either URL-encode them (e.g. `@` → `%40`) or use a password with only letters/numbers to avoid connection errors.

Start the backend:
```bash
npm run server   # runs with nodemon (auto-restart on changes)
# or
npm start        # runs with plain node
```
Backend runs on `http://localhost:4000` by default.

### 3. Frontend setup
```bash
cd ../client
npm install
```

Create a `client/.env` file:
```dotenv
VITE_CURRENCY=₹
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173` by default.

---

## Deployment

### Backend — Render
1. Create a new **Web Service** on [Render](https://render.com), connect this GitHub repo
2. **Root Directory:** `server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add all environment variables listed above in Render's Environment tab
6. Set `NODE_ENV=production` (required for secure cross-origin cookies)
7. In MongoDB Atlas → Network Access, allow `0.0.0.0/0` since Render doesn't use static IPs

### Frontend — Vercel
1. Import this repo on [Vercel](https://vercel.com)
2. **Root Directory:** `client`
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Add environment variables:
   - `VITE_CURRENCY=₹`
   - `VITE_BACKEND_URL=<your Render backend URL>`
   - `VITE_RAZORPAY_KEY_ID=<your Razorpay key>`
7. A `client/vercel.json` file is included to handle React Router's client-side routes (prevents 404s on refresh/direct navigation):
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### Post-deployment: connect the two
Update `allowedOrigins` in `server/server.js` with your live Vercel URL so CORS allows requests from production:
```js
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app'
]
```
Commit and push — Render will auto-redeploy.

---

## Environment Variables Reference

| Variable | Location | Description |
|---|---|---|
| `JWT_SECRET` | server | Secret key for signing JWT tokens |
| `NODE_ENV` | server | `development` locally, `production` on Render |
| `SELLER_EMAIL` / `SELLER_PASSWORD` | server | Admin/seller login credentials |
| `MONGODB_URI` | server | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | server | Cloudinary credentials for image uploads |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | server | Razorpay payment gateway credentials |
| `VITE_CURRENCY` | client | Currency symbol displayed in UI |
| `VITE_BACKEND_URL` | client | Base URL of the deployed backend API |
| `VITE_RAZORPAY_KEY_ID` | client | Public Razorpay key for checkout |

**Security note:** Never commit `.env` files to version control. Both `client/.gitignore` and `server/.gitignore` already exclude them.

---

## API Overview

| Route Prefix | Purpose |
|---|---|
| `/api/user` | User registration, login, auth check, logout |
| `/api/seller` | Seller login, auth check |
| `/api/product` | Product listing, details, add (seller) |
| `/api/cart` | Cart management |
| `/api/address` | Delivery address management |
| `/api/order` | Order placement and history |

---

## License

This project is for educational/personal portfolio use.
