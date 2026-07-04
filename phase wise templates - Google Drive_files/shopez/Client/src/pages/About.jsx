import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{ flex: 1, background: "#f8f7ff" }}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.title}>About <span style={styles.gradient}>ShopEZ</span></h1>
        <p style={styles.desc}>
          ShopEZ is a modern full-stack e-commerce platform built with the MERN stack —
          MongoDB, Express, React, and Node.js. Shop smarter, live better.
        </p>
      </section>

      {/* Tech Stack */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Built With</h2>
          <div style={styles.techGrid}>
            {[
              { icon: "🍃", name: "MongoDB", desc: "NoSQL database for flexible product & user storage" },
              { icon: "⚡", name: "Express.js", desc: "Fast, minimalist web framework for Node.js" },
              { icon: "⚛️", name: "React", desc: "Component-based UI with hooks & context API" },
              { icon: "🟢", name: "Node.js", desc: "JavaScript runtime for the server-side backend" },
            ].map(({ icon, name, desc }) => (
              <div key={name} style={styles.techCard}>
                <span style={styles.techIcon}>{icon}</span>
                <h3 style={styles.techName}>{name}</h3>
                <p style={styles.techDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ ...styles.section, background: "#1a1a2e" }}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, color: "white" }}>Features</h2>
          <div style={styles.featureList}>
            {[
              "🔐 User Authentication (Register / Login with JWT)",
              "🛍️ Product Browsing with Search & Category Filters",
              "🛒 Shopping Cart with Quantity Management",
              "💾 Cart Persisted in localStorage",
              "📦 Product Management (CRUD) via REST API",
              "📱 Responsive Design for all screen sizes",
              "🔒 Password Hashing with bcryptjs",
              "✅ Order Placement Confirmation",
            ].map((feat) => (
              <div key={feat} style={styles.featItem}>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to shop?</h2>
        <Link to="/products" style={styles.ctaBtn}>Browse Products →</Link>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg,#ede9ff,#f8f7ff)",
    textAlign: "center",
    padding: "80px 24px",
  },
  title: { fontSize: 48, fontWeight: 800, color: "#1a1a2e", marginBottom: 16 },
  gradient: {
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  desc: { fontSize: 18, color: "#6b7280", maxWidth: 560, margin: "0 auto" },
  section: { padding: "60px 0" },
  container: { maxWidth: 1000, margin: "0 auto", padding: "0 24px" },
  sectionTitle: { fontSize: 32, fontWeight: 700, textAlign: "center", color: "#1a1a2e", marginBottom: 40 },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 20,
  },
  techCard: {
    background: "white",
    borderRadius: 16,
    padding: "32px 20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  techIcon: { fontSize: 40, display: "block", marginBottom: 12 },
  techName: { fontSize: 18, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 },
  techDesc: { fontSize: 13, color: "#6b7280" },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 12,
  },
  featItem: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "16px 20px",
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: 500,
  },
  cta: {
    textAlign: "center",
    padding: "80px 24px",
    background: "linear-gradient(135deg,#6c3af0,#5429d4)",
  },
  ctaTitle: { fontSize: 36, fontWeight: 800, color: "white", marginBottom: 24 },
  ctaBtn: {
    display: "inline-block",
    padding: "16px 40px",
    background: "white",
    color: "#6c3af0",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
};
