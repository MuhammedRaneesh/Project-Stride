import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { Reveal, fadeUp, staggerContainer } from "../../utils/motion";
import "./LatestDrops.css";

import { useWishlist } from "../../Context/WishlistContext";

// Formats number to Indian rupee string (e.g. ₹12,000)
const formatPrice = (price) => {
  if (!price && price !== 0) return "₹0";
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      variants={fadeUp}
      className="old-product-card"
    >
      <Link to={`/shop/${product._id}`} className="old-product-link">
        {/* Wishlist toggle */}
        <button
          type="button"
          className="old-wishlist-btn"
          onClick={handleWishlistToggle}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? (
            <FaHeart className="old-heart-icon filled" />
          ) : (
            <FaRegHeart className="old-heart-icon" />
          )}
        </button>

        {/* Clean Image Box */}
        <div className="old-image-box">
          <img
            src={product.image}
            alt={product.name || "Sneaker drop"}
            loading="lazy"
            className="old-product-img"
          />
        </div>

        {/* Product Info (Clean, centered old style) */}
        <div className="old-product-info">
          <span className="old-product-brand">{product.brand}</span>
          <h3 className="old-product-name">{product.name}</h3>
          <p className="old-product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function LatestDrops() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrops = () => {
    setLoading(true);
    setError(null);

    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Latest drops load error", err);
        setError("Could not load latest drops right now.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDrops();
  }, []);

  return (
    <section className="old-drops-section" aria-label="Latest sneaker drops">
      <div className="old-drops-container">
        {/* Section Header */}
        <div className="old-drops-header">
          <Reveal once={false}>
            <span className="old-drops-eyebrow">NEW ARRIVALS</span>
            <h2 className="old-drops-title">LATEST DROPS</h2>
          </Reveal>
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="old-drops-error">
            <p>{error}</p>
            <button onClick={fetchDrops} className="old-retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Skeleton Shimmer Loading State */}
        {loading && (
          <div className="old-drops-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="old-product-card old-skeleton-card">
                <div className="old-skeleton-img shimmer" />
                <div className="old-skeleton-line short shimmer" />
                <div className="old-skeleton-line medium shimmer" />
                <div className="old-skeleton-line tiny shimmer" />
              </div>
            ))}
          </div>
        )}

        {/* Product Cards Grid with Stagger Reveal (once: false for bi-directional scroll animation) */}
        {!loading && !error && (
          <motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="old-drops-grid"
          >
            {products.slice(0, 6).map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </motion.div>
        )}

        {/* View All Collection Button */}
        <Reveal once={false} className="old-view-all-wrapper" amount={0.2}>
          <Link to="/shop" className="old-view-all-btn">
            View All Collection →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default LatestDrops;
