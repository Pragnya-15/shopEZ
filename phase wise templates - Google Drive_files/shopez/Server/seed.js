const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  // Electronics
  { name: "iPhone 17 Pro", price: 134900, description: "Apple's flagship smartphone with A19 chip, ProMotion display, and advanced camera system.", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80", countInStock: 15, brand: "Apple", category: "Electronics" },
  { name: "Samsung Galaxy S25", price: 89999, description: "Samsung's latest flagship with Snapdragon 8 Elite, 200MP camera, and all-day battery.", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80", countInStock: 20, brand: "Samsung", category: "Electronics" },
  { name: "iPhone 15 Pro", price: 99900, description: "Titanium design, Action Button, USB-C, and the powerful A17 Pro chip.", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80", countInStock: 10, brand: "Apple", category: "Electronics" },

  // Laptops
  { name: "MacBook Air M3", price: 114900, description: "Incredibly thin and light laptop with M3 chip, 18-hour battery, and Liquid Retina display.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", countInStock: 8, brand: "Apple", category: "Laptops" },
  { name: "Dell XPS 15", price: 149999, description: "Premium Windows laptop with InfinityEdge display, Intel Core i9, and NVIDIA RTX GPU.", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80", countInStock: 12, brand: "Dell", category: "Laptops" },
  { name: "HP Pavilion 15", price: 67999, description: "Everyday laptop with AMD Ryzen 7, Full HD display, and fast SSD storage.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", countInStock: 18, brand: "HP", category: "Laptops" },
  { name: "ASUS ROG Gaming", price: 124999, description: "High-performance gaming laptop with RTX 4070, 165Hz display, and RGB keyboard.", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80", countInStock: 6, brand: "ASUS", category: "Laptops" },
  { name: "Lenovo ThinkPad X1", price: 139999, description: "Business-class laptop with military-grade durability, 4G LTE, and all-day battery.", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80", countInStock: 9, brand: "Lenovo", category: "Laptops" },

  // Audio
  { name: "AirPods Pro 2", price: 24900, description: "Active Noise Cancellation, Transparency mode, Adaptive Audio, and H2 chip.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80", countInStock: 30, brand: "Apple", category: "Audio" },
  { name: "Samsung Galaxy Buds", price: 11999, description: "Intelligent ANC, 360 Audio, and up to 30 hours of battery with the charging case.", image: "https://images.unsplash.com/photo-1590658165737-15a047b7038b?w=400&q=80", countInStock: 25, brand: "Samsung", category: "Audio" },
  { name: "OnePlus Buds Pro", price: 8999, description: "Adaptive Noise Cancellation, LHDC audio codec, and fast charging support.", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80", countInStock: 20, brand: "OnePlus", category: "Audio" },
  { name: "OPPO Enco X2", price: 9999, description: "Co-engineered with Dynaudio, dual drivers, and 3-mic noise cancellation.", image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80", countInStock: 14, brand: "OPPO", category: "Audio" },

  // Fashion
  { name: "Casual Shirt", price: 1299, description: "Premium cotton casual shirt, perfect for everyday wear. Available in multiple colors.", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80", countInStock: 50, brand: "FashionHub", category: "Fashion" },
  { name: "Denim Jacket", price: 2499, description: "Classic denim jacket with a modern slim fit. Durable and stylish for all seasons.", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80", countInStock: 35, brand: "DenimCo", category: "Fashion" },
  { name: "Slim Fit Jeans", price: 1899, description: "Stretchable slim fit jeans with a comfortable waistband and premium denim fabric.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80", countInStock: 60, brand: "DenimCo", category: "Fashion" },
  { name: "Floral Dress", price: 1699, description: "Lightweight floral print dress perfect for summer outings and casual events.", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80", countInStock: 40, brand: "StyleWear", category: "Fashion" },
  { name: "Kurti Set", price: 1499, description: "Elegant ethnic kurti with matching bottom, made from breathable cotton fabric.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80", countInStock: 45, brand: "EthnicWear", category: "Fashion" },
  { name: "Sports Shoes", price: 3499, description: "Lightweight running shoes with cushioned sole, breathable mesh upper, and anti-slip grip.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", countInStock: 28, brand: "SportsFit", category: "Fashion" },

  // Beauty
  { name: "Face Wash", price: 299, description: "Gentle foaming face wash with neem and aloe vera extracts for clear, glowing skin.", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", countInStock: 100, brand: "GlowUp", category: "Beauty" },
  { name: "Moisturizer SPF30", price: 499, description: "Daily moisturizer with SPF 30 protection, hyaluronic acid, and vitamin C.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80", countInStock: 80, brand: "GlowUp", category: "Beauty" },
  { name: "Matte Lipstick", price: 399, description: "Long-lasting matte lipstick with rich pigment and a smooth, non-drying formula.", image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2177?w=400&q=80", countInStock: 75, brand: "ColorPop", category: "Beauty" },
  { name: "Sunscreen SPF50", price: 449, description: "Broad-spectrum SPF 50 sunscreen, water-resistant, non-greasy, and dermatologist tested.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80", countInStock: 90, brand: "SunShield", category: "Beauty" },
  { name: "Shampoo", price: 349, description: "Nourishing shampoo with keratin and argan oil for smooth, frizz-free hair.", image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&q=80", countInStock: 95, brand: "HairCare", category: "Beauty" },

  // Sports
  { name: "Football", price: 899, description: "FIFA-approved match ball with waterproof coating and excellent flight stability.", image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80", countInStock: 40, brand: "SportsPro", category: "Sports" },
  { name: "Cricket Bat", price: 2999, description: "English willow cricket bat, Grade 1, with full-size grip and excellent power.", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80", countInStock: 22, brand: "CricketKing", category: "Sports" },
  { name: "Badminton Set", price: 1599, description: "Premium badminton racket set with 2 rackets, 6 shuttlecocks, and a carry bag.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80", countInStock: 30, brand: "SportsPro", category: "Sports" },

  // Grocery
  { name: "Basmati Rice 5kg", price: 549, description: "Premium aged basmati rice, long grain, aromatic, perfect for biryani and pulao.", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", countInStock: 200, brand: "FreshFarm", category: "Grocery" },
  { name: "Wheat Flour 5kg", price: 289, description: "100% whole wheat atta, stone-ground, rich in fiber and nutrients.", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", countInStock: 150, brand: "FreshFarm", category: "Grocery" },
  { name: "Mustard Oil 1L", price: 199, description: "Pure cold-pressed mustard oil, rich in omega-3 fatty acids and antioxidants.", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", countInStock: 120, brand: "PureNature", category: "Grocery" },
  { name: "Sugar 1kg", price: 59, description: "Fine grain refined sugar, perfect for everyday cooking and baking.", image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80", countInStock: 300, brand: "SweetMart", category: "Grocery" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    await Product.insertMany(products);
    console.log(`✅ Inserted ${products.length} products`);

    await mongoose.disconnect();
    console.log("✅ Done! Run your server now.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
