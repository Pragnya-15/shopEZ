import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/CartContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://shopez-klpr.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server returned an invalid response. Is the backend running?");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.user || !data.token) {
        throw new Error("Invalid response from server. Missing user or token.");
      }

      login(data.user, data.token);
      navigate("/products");
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Cannot connect to server. Make sure the backend is running on port 5000.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoArea}>
          <span style={{ fontSize: 40 }}>🛍️</span>
          <h1 style={styles.brand}>ShopEZ</h1>
        </div>

        <h2 style={styles.title}>Welcome back!</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Create one</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    background: "linear-gradient(135deg,#f8f7ff,#ede9ff)",
    padding: 24,
  },
  card: {
    background: "white",
    borderRadius: 24,
    padding: "48px 40px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 8px 40px rgba(108,58,240,0.12)",
  },
  logoArea: { textAlign: "center", marginBottom: 24 },
  brand: {
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: 28,
    fontWeight: 800,
  },
  title: { fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 4, textAlign: "center" },
  subtitle: { color: "#6b7280", textAlign: "center", marginBottom: 28, fontSize: 15 },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 500,
  },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
  },
  submitBtn: {
    padding: "14px",
    background: "#6c3af0",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 4,
  },
  switchText: { textAlign: "center", color: "#6b7280", fontSize: 14, marginTop: 24 },
  link: { color: "#6c3af0", fontWeight: 600, textDecoration: "none" },
};
