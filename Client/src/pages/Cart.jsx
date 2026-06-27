import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart, cartTotal } = useCart();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div style={styles.successPage}>
        <div style={styles.successCard}>
          <div style={styles.checkCircle}>✅</div>
          <h2 style={styles.successTitle}>Order Placed!</h2>
          <p style={styles.successMsg}>
            Thank you for shopping with ShopEZ! Your order has been placed successfully.
          </p>
          <Link to="/products" style={styles.continueShopping}>
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <div style={{ fontSize: 80 }}>🛒</div>
        <h2 style={{ color: "#1a1a2e", marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "#6b7280", marginBottom: 24 }}>Browse our products and add something you love!</p>
        <Link to="/products" style={styles.btnPrimary}>
          🛍️ Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, background: "#f8f7ff", padding: "32px 0", minHeight: "100vh" }}>
      <div style={styles.container}>
        <h1 style={styles.title}>Your Cart ({cart.length} item{cart.length !== 1 ? "s" : ""})</h1>

        <div style={styles.layout}>
          {/* Cart Items */}
          <div style={styles.items}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                {/* Image placeholder */}
                <div style={styles.itemImg}>
                  {item.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <span style={{ fontSize: 36 }}>📦</span>
                  )}
                </div>

                {/* Details */}
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>₹{item.price?.toLocaleString()} each</p>
                  <p style={styles.itemSubtotal}>
                    Subtotal: <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                  </p>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                  <div style={styles.qtyRow}>
                    <button onClick={() => decreaseQty(item.id)} style={styles.qtyBtn}>−</button>
                    <span style={styles.qty}>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)} style={styles.qtyBtn}>+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRows}>
              {cart.map((item) => (
                <div key={item.id} style={styles.summaryRow}>
                  <span style={{ color: "#374151", fontSize: 14 }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalAmount}>₹{cartTotal.toLocaleString()}</span>
            </div>

            <div style={styles.savings}>
              🎉 You're saving on shipping (free delivery!)
            </div>

            <button onClick={handleCheckout} style={styles.checkoutBtn}>
              ✅ Place Order — ₹{cartTotal.toLocaleString()}
            </button>

            <button onClick={clearCart} style={styles.clearBtn}>
              🗑️ Clear Cart
            </button>

            <Link to="/products" style={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  title: { fontSize: 32, fontWeight: 800, color: "#1a1a2e", marginBottom: 32 },
  layout: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" },
  items: { display: "flex", flexDirection: "column", gap: 16 },
  cartItem: {
    background: "white",
    borderRadius: 16,
    padding: "20px",
    display: "flex",
    gap: 20,
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  itemImg: {
    width: 90,
    height: 90,
    borderRadius: 10,
    background: "#f3f4f6",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 },
  itemPrice: { fontSize: 14, color: "#6b7280" },
  itemSubtotal: { fontSize: 14, color: "#374151", marginTop: 4 },
  controls: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 32,
    height: 32,
    border: "2px solid #e5e7eb",
    borderRadius: 8,
    background: "white",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    color: "#6c3af0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qty: { fontSize: 18, fontWeight: 700, minWidth: 28, textAlign: "center" },
  removeBtn: {
    border: "none",
    background: "#fee2e2",
    color: "#ef4444",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  summary: {
    background: "white",
    borderRadius: 20,
    padding: "28px",
    boxShadow: "0 4px 20px rgba(108,58,240,0.1)",
    position: "sticky",
    top: 80,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  summaryTitle: { fontSize: 20, fontWeight: 700, color: "#1a1a2e" },
  summaryRows: { display: "flex", flexDirection: "column", gap: 8 },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: 14 },
  divider: { height: 1, background: "#e5e7eb", margin: "4px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: 18, fontWeight: 700 },
  totalAmount: { fontSize: 24, fontWeight: 800, color: "#6c3af0" },
  savings: {
    background: "#d1fae5",
    color: "#065f46",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 12,
    fontWeight: 600,
  },
  checkoutBtn: {
    padding: "14px",
    background: "#6c3af0",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
  clearBtn: {
    padding: "10px",
    background: "transparent",
    color: "#ef4444",
    border: "2px solid #ef4444",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
  continueLink: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 13,
    textDecoration: "none",
    fontWeight: 500,
  },
  emptyPage: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 8,
  },
  btnPrimary: {
    padding: "14px 32px",
    background: "#6c3af0",
    color: "white",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 16,
  },
  successPage: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    background: "#f8f7ff",
  },
  successCard: {
    background: "white",
    borderRadius: 24,
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(108,58,240,0.12)",
    maxWidth: 440,
  },
  checkCircle: { fontSize: 64, marginBottom: 16 },
  successTitle: { fontSize: 32, fontWeight: 800, color: "#1a1a2e", marginBottom: 12 },
  successMsg: { color: "#6b7280", marginBottom: 32 },
  continueShopping: {
    display: "inline-block",
    padding: "14px 32px",
    background: "#6c3af0",
    color: "white",
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: "none",
  },
};
