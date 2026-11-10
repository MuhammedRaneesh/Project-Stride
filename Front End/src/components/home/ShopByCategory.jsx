import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, fadeUp, staggerContainer } from "../../utils/motion";
import "./ShopByCategory.css";

// Category data — easily customizable
const CATEGORIES = [
  {
    id: "01",
    title: "RUNNING",
    slug: "running",
    tagline: "ENGINEERED FOR SPEED & COMFORT",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "02",
    title: "LIFESTYLE",
    slug: "lifestyle",
    tagline: "STREET CULTURE DEFINED",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "03",
    title: "BASKETBALL",
    slug: "basketball",
    tagline: "COURT DOMINANCE & IMPACT",
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=900&q=80",
  },
];

function ShopByCategory() {
  return (
    <section className="category-section" aria-label="Shop sneakers by category">
      <div className="category-container">
        <Reveal once={false}>
          <div className="category-eyebrow">COLLECTIONS</div>
          <h2 className="category-heading">SHOP BY CATEGORY</h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.12, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="category-grid"
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp} className="category-card">
              <Link to={`/shop?category=${cat.slug}`} className="category-card-link">
                {/* Background image or gradient fallback */}
                <div
                  className={`category-bg ${!cat.image ? "gradient-fallback" : ""}`}
                  style={
                    cat.image
                      ? { backgroundImage: `url(${cat.image})` }
                      : undefined
                  }
                />
                <div className="category-overlay" />

                {/* Content */}
                <div className="category-content">
                  <span className="category-number">{cat.id}</span>
                  <span className="category-tagline">{cat.tagline}</span>
                  <h3 className="category-title">{cat.title}</h3>

                  <div className="category-explore">
                    <span>Explore</span>
                    <span className="category-arrow">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ShopByCategory;
