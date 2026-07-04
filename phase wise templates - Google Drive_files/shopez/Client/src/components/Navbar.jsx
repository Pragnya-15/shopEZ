import { Link, useLocation } from "react-router-dom";
import { useCart, useAuth } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          🛍️ <span style={styles.logoText}>ShopEZ</span>
        </Link>

        {/* Desktop Links */}
        <div style={styles.links}>
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                ...styles.link,
                ...(isActive(to) ? styles.activeLink : {}),
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={styles.right}>
          {/* Cart */}
          <Link to="/cart" style={styles.cartBtn}>
            <span style={{ position: "relative", display: "inline-block" }}>
              🛒
              {cartCount > 0 && (
                <span style={styles.badge}>{cartCount}</span>
              )}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Cart</span>
          </Link>

          {/* Auth */}
          {user ? (
            <div style={styles.userMenu}>
              <span style={styles.username}>👤 {user.name}</span>
              <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div style={styles.authLinks}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(108,58,240,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "#6c3af0",
    fontSize: 22,
    fontWeight: 700,
  },
  logoText: {
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  links: {
    display: "flex",
    gap: 4,
    flex: 1,
    justifyContent: "center",
  },
  link: {
    padding: "6px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "#374151",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  activeLink: {
    background: "#ede9ff",
    color: "#6c3af0",
    fontWeight: 600,
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    borderRadius: 8,
    background: "#ede9ff",
    color: "#6c3af0",
    textDecoration: "none",
    fontSize: 20,
    fontWeight: 600,
    transition: "all 0.2s",
    position: "relative",
  },
  badge: {
    background: "#ff6b35",
    color: "white",
    borderRadius: "50%",
    width: 18,
    height: 18,
    fontSize: 10,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -6,
    right: -6,
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
  },
  logoutBtn: {
    padding: "6px 14px",
    borderRadius: 8,
    border: "2px solid #ef4444",
    background: "transparent",
    color: "#ef4444",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  authLinks: {
    display: "flex",
    gap: 8,
  },
  loginBtn: {
    padding: "6px 16px",
    borderRadius: 8,
    border: "2px solid #6c3af0",
    color: "#6c3af0",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
  registerBtn: {
    padding: "6px 16px",
    borderRadius: 8,
    background: "#6c3af0",
    color: "white",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
  },
};
