import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>🚀 India's Fastest Growing Store</span>
          <h1 style={styles.heroTitle}>
            Shop Smarter,<br />
            <span style={styles.gradient}>Live Better</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Discover thousands of products across electronics, fashion, beauty, sports and more —
            all in one place with the best prices.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/products" style={styles.btnPrimary}>
              🛍️ Shop Now
            </Link>
            <Link to="/about" style={styles.btnOutline}>
              Learn More
            </Link>
          </div>
          <div style={styles.stats}>
            {[
              { n: "10K+", label: "Products" },
              { n: "50K+", label: "Customers" },
              { n: "4.8★", label: "Rating" },
              { n: "Free", label: "Delivery" },
            ].map(({ n, label }) => (
              <div key={label} style={styles.stat}>
                <span style={styles.statNum}>{n}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroIllustration}>
          <div style={styles.illustBox}>
            {["📱", "💻", "👗", "⚽", "💄", "🎧"].map((emoji, i) => (
              <div
                key={i}
                style={{
                  ...styles.floatingItem,
                  animationDelay: `${i * 0.4}s`,
                  top: `${10 + (i % 3) * 30}%`,
                  left: `${10 + Math.floor(i / 3) * 50}%`,
                }}
              >
                {emoji}
              </div>
            ))}
            <div style={styles.heroBgCircle} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <div style={styles.catGrid}>
            {[
              { label: "Electronics", icon: "📱", color: "#dbeafe", border: "#3b82f6" },
              { label: "Laptops", icon: "💻", color: "#ede9ff", border: "#6c3af0" },
              { label: "Fashion", icon: "👗", color: "#fce7f3", border: "#ec4899" },
              { label: "Beauty", icon: "💄", color: "#fef3c7", border: "#f59e0b" },
              { label: "Sports", icon: "⚽", color: "#d1fae5", border: "#10b981" },
              { label: "Grocery", icon: "🛒", color: "#fee2e2", border: "#ef4444" },
              { label: "Audio", icon: "🎧", color: "#ede9ff", border: "#6c3af0" },
            ].map(({ label, icon, color, border }) => (
              <Link
                to={`/products?category=${label}`}
                key={label}
                style={{ ...styles.catCard, background: color, borderColor: border }}
              >
                <span style={styles.catIcon}>{icon}</span>
                <span style={styles.catLabel}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ ...styles.section, background: "#1a1a2e", color: "white" }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, color: "white" }}>Why ShopEZ?</h2>
          <div style={styles.featGrid}>
            {[
              { icon: "🚚", title: "Free Delivery", desc: "On all orders above ₹499" },
              { icon: "🔒", title: "Secure Payments", desc: "100% safe & encrypted transactions" },
              { icon: "↩️", title: "Easy Returns", desc: "7-day hassle-free returns" },
              { icon: "🎧", title: "24/7 Support", desc: "We're always here to help" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={styles.featCard}>
                <span style={styles.featIcon}>{icon}</span>
                <h3 style={styles.featTitle}>{title}</h3>
                <p style={{ color: "#9ca3af", fontSize: 14 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2024 ShopEZ. Built with ❤️ using MERN Stack</p>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%)",
    display: "flex",
    alignItems: "center",
    minHeight: "80vh",
    padding: "60px 24px",
    maxWidth: 1200,
    margin: "0 auto",
    gap: 60,
  },
  heroContent: { flex: 1 },
  badge: {
    display: "inline-block",
    background: "#ede9ff",
    color: "#6c3af0",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 800,
    lineHeight: 1.1,
    color: "#1a1a2e",
    marginBottom: 20,
  },
  gradient: {
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#6b7280",
    marginBottom: 32,
    maxWidth: 480,
  },
  heroBtns: { display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" },
  btnPrimary: {
    padding: "14px 28px",
    background: "#6c3af0",
    color: "white",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
  btnOutline: {
    padding: "14px 28px",
    background: "transparent",
    color: "#6c3af0",
    border: "2px solid #6c3af0",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
  stats: { display: "flex", gap: 32 },
  stat: { display: "flex", flexDirection: "column", gap: 2 },
  statNum: { fontSize: 24, fontWeight: 800, color: "#6c3af0" },
  statLabel: { fontSize: 13, color: "#6b7280" },
  heroIllustration: { flex: 1, display: "flex", justifyContent: "center" },
  illustBox: {
    width: 360,
    height: 360,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  floatingItem: {
    position: "absolute",
    fontSize: 40,
    background: "white",
    borderRadius: 16,
    width: 72,
    height: 72,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(108,58,240,0.15)",
    animation: "float 3s ease-in-out infinite",
  },
  heroBgCircle: {
    width: 240,
    height: 240,
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    borderRadius: "50%",
    opacity: 0.1,
  },
  section: { padding: "60px 0" },
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 40,
    color: "#1a1a2e",
  },
  catGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 16,
  },
  catCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: "24px 12px",
    borderRadius: 12,
    border: "2px solid",
    textDecoration: "none",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  catIcon: { fontSize: 32 },
  catLabel: { fontSize: 14, fontWeight: 600, color: "#1a1a2e" },
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 24,
  },
  featCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "32px 24px",
    textAlign: "center",
  },
  featIcon: { fontSize: 36, display: "block", marginBottom: 12 },
  featTitle: { fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 },
  footer: {
    background: "#1a1a2e",
    color: "#6b7280",
    textAlign: "center",
    padding: "20px 24px",
    fontSize: 14,
  },
};
