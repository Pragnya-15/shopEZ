# ShopEZ — MERN E-Commerce App

## 🚀 Setup & Run

### 1. Start the Backend
```bash
cd Server
npm install
node server.js
```
Backend runs on: http://localhost:5000

### 2. Start the Frontend
```bash
cd Client
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## 📁 Project Structure
```
ShopEZ/
├── Client/           # React + Vite frontend
│   └── src/
│       ├── components/Navbar.jsx
│       ├── context/CartContext.jsx   (Cart + Auth)
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Products.jsx
│       │   ├── Cart.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── About.jsx
│       ├── App.jsx
│       └── main.jsx
└── Server/           # Node.js + Express backend
    ├── config/db.js
    ├── models/
    │   ├── Product.js
    │   └── User.js
    ├── routes/
    │   ├── productRoutes.js
    │   └── userRoutes.js
    ├── uploads/          ← put product images here
    ├── .env
    └── server.js
```

## 🌟 Features
- Browse products with search & category filters
- User registration & login (JWT auth)
- Add to cart, adjust quantity, remove items
- Cart persisted in localStorage
- Order placement with confirmation screen
- Responsive, modern UI

## 🖼️ Product Images
Place your product images in `Server/uploads/`.
They're served at `http://localhost:5000/uploads/<filename>`.
