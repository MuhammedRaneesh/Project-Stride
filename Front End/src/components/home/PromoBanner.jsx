import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/motion";
import "./PromoBanner.css";

function PromoBanner() {
  const bannerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  // Parallax translation for the giant background text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={bannerRef} className="promo-banner-section" aria-label="Featured season drop">
      {/* Giant outlined background text */}
      <motion.div style={{ y: bgTextY }} className="promo-bg-text" aria-hidden="true">
        STRIDE
      </motion.div>

      <div className="promo-container">
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="promo-content"
        >
          <motion.span variants={fadeUp} className="promo-eyebrow">
            NEW SEASON
          </motion.span>

          <motion.h2 variants={fadeUp} className="promo-heading">
            NEW SEASON.
            <br />
            NEW PACE.
          </motion.h2>

          <motion.p variants={fadeUp} className="promo-description">
            High-performance silhouettes crafted for daily movement, precision cushioning, and bold street expression.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/shop" className="promo-pill-btn">
              Shop the drop →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PromoBanner;
