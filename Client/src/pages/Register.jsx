import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/CartContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      login(data.user, data.token);
      navigate("/products");
    } catch (err) {
      setError(err.message);
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

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join thousands of happy shoppers</p>

        {error && <div style={styles.error}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
            { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "Min 6 characters" },
            { name: "confirm", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name} style={styles.field}>
              <label style={styles.label}>{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                minLength={name === "password" ? 6 : undefined}
                style={styles.input}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign in</Link>
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
    padding: "40px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 8px 40px rgba(108,58,240,0.12)",
  },
  logoArea: { textAlign: "center", marginBottom: 20 },
  brand: {
    background: "linear-gradient(135deg,#6c3af0,#ff6b35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: 28,
    fontWeight: 800,
  },
  title: { fontSize: 24, fontWeight: 800, color: "#1a1a2e", marginBottom: 4, textAlign: "center" },
  subtitle: { color: "#6b7280", textAlign: "center", marginBottom: 24, fontSize: 14 },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px 16px",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 16,
    fontWeight: 500,
  },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    padding: "11px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
  },
  submitBtn: {
    padding: "13px",
    background: "#6c3af0",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 4,
  },
  switchText: { textAlign: "center", color: "#6b7280", fontSize: 14, marginTop: 20 },
  link: { color: "#6c3af0", fontWeight: 600, textDecoration: "none" },
};
