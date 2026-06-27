import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CATEGORIES = ["All", "Electronics", "Laptops", "Audio", "Fashion", "Beauty", "Sports", "Grocery"];

function getImageSrc(image) {
  if (!image) return null;
  if (image.startsWith("http")) return image; // URL from DB
  return `http://localhost:5000/uploads/${image}`; // local file
}

export default function Products() {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("keyword", search);
    if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);

    fetch(`http://localhost:5000/api/products?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error: " + res.status);
        return res.json();
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [search, activeCategory]);

  const handleAddToCart = (p) => {
    addToCart({ id: p._id, name: p.name, price: p.price, image: p.image });
    setToast(`✅ "${p.name}" added to cart!`);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div style={{ flex: 1, padding: "32px 0", background: "#f8f7ff", minHeight: "100vh" }}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Our Products</h1>
            <p style={styles.subtitle}>
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch("")} style={styles.clearBtn}>✕</button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div style={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ ...styles.filterBtn, ...(activeCategory === cat ? styles.filterBtnActive : {}) }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div style={styles.centerMsg}>
            <div style={styles.spinner} />
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div style={styles.error}>
            <span style={{ fontSize: 48 }}>⚠️</span>
            <h3>Could not load products</h3>
            <p>{error}</p>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Make sure the backend is running on port 5000</p>
          </div>
        ) : products.length === 0 ? (
          <div style={styles.centerMsg}>
            <span style={{ fontSize: 48 }}>🔍</span>
            <h3>No products found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </div>

      {toast && <div style={styles.toast}>{toast}</div>}
    </div>
  );
}

function ProductCard({ product: p, onAddToCart }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = getImageSrc(p.image);

  return (
    <div style={styles.card}>
      <div style={styles.imgWrapper}>
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={p.name}
            style={styles.img}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={styles.imgPlaceholder}>
            <span style={{ fontSize: 48 }}>📦</span>
          </div>
        )}
        {p.category && <span style={styles.catBadge}>{p.category}</span>}
      </div>

      <div style={styles.cardBody}>
        {p.brand && <p style={styles.brand}>{p.brand}</p>}
        <h3 style={styles.name}>{p.name}</h3>
        <p style={styles.desc}>{p.description?.slice(0, 72)}{p.description?.length > 72 ? "…" : ""}</p>

        <div style={styles.cardFooter}>
          <div>
            <span style={styles.price}>₹{p.price?.toLocaleString()}</span>
            {p.countInStock > 0
              ? <span style={styles.inStock}>✓ In Stock</span>
              : <span style={styles.outStock}>Out of Stock</span>}
          </div>
          <button
            onClick={() => onAddToCart(p)}
            disabled={p.countInStock === 0}
            style={{ ...styles.addBtn, ...(p.countInStock === 0 ? styles.addBtnDisabled : {}) }}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 },
  title: { fontSize: 32, fontWeight: 800, color: "#1a1a2e", marginBottom: 4 },
  subtitle: { color: "#6b7280", fontSize: 14 },
  searchBox: { display: "flex", alignItems: "center", background: "white", border: "2px solid #e5e7eb", borderRadius: 10, padding: "0 12px", width: 300, gap: 8 },
  searchIcon: { fontSize: 16 },
  searchInput: { border: "none", outline: "none", padding: "10px 0", flex: 1, fontSize: 14, background: "transparent" },
  clearBtn: { border: "none", background: "none", cursor: "pointer", color: "#9ca3af", fontSize: 14 },
  filters: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 },
  filterBtn: { padding: "8px 18px", borderRadius: 20, border: "2px solid #e5e7eb", background: "white", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  filterBtnActive: { background: "#6c3af0", borderColor: "#6c3af0", color: "white", fontWeight: 600 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 20 },
  card: { background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", transition: "transform 0.2s, box-shadow 0.2s" },
  imgWrapper: { position: "relative", paddingTop: "65%", background: "#f8f7ff" },
  img: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  imgPlaceholder: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" },
  catBadge: { position: "absolute", top: 10, left: 10, background: "#6c3af0", color: "white", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 },
  cardBody: { padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  brand: { fontSize: 11, fontWeight: 700, color: "#6c3af0", textTransform: "uppercase", letterSpacing: 1 },
  name: { fontSize: 16, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 },
  desc: { fontSize: 13, color: "#6b7280", flex: 1 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  price: { fontSize: 20, fontWeight: 800, color: "#6c3af0", display: "block" },
  inStock: { fontSize: 11, color: "#10b981", fontWeight: 600 },
  outStock: { fontSize: 11, color: "#ef4444", fontWeight: 600 },
  addBtn: { padding: "8px 14px", background: "#6c3af0", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" },
  addBtnDisabled: { background: "#d1d5db", cursor: "not-allowed" },
  centerMsg: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12, color: "#6b7280" },
  spinner: { width: 40, height: 40, border: "4px solid #e5e7eb", borderTopColor: "#6c3af0", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  error: { textAlign: "center", padding: 60, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", color: "#374151" },
  toast: { position: "fixed", bottom: 24, right: 24, background: "#1a1a2e", color: "white", padding: "12px 20px", borderRadius: 10, fontSize: 14, zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
};
