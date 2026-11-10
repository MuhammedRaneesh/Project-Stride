import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import "./Footer.css";

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();

  // Show floating button after 600px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 600);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" aria-label="Footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">STRIDE</h2>
            <p className="footer-tagline">
              Premium kicks for the modern pace. Where underground street culture meets cutting-edge footwear design.
            </p>
            {/* Social Media Links with Hover Lift & Pink Transition */}
            <div className="footer-socials">
              {/* Replace '#' with real social profiles */}
              <a
                href="#instagram"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                className="social-link"
              >
                <FaInstagram />
              </a>
              <a
                href="#twitter"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter profile"
                className="social-link"
              >
                <FaTwitter />
              </a>
              <a
                href="#linkedin"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="social-link"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="footer-col">
            <h4 className="footer-heading">SHOP</h4>
            <ul className="footer-links">
              <li>
                <Link to="/shop">All Sneakers</Link>
              </li>
              <li>
                <Link to="/shop?brand=nike">Nike</Link>
              </li>
              <li>
                <Link to="/shop?brand=adidas">Adidas</Link>
              </li>
              <li>
                <Link to="/shop?brand=puma">Puma</Link>
              </li>
              <li>
                <Link to="/shop?brand=new-balance">New Balance</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links / Company (Only real pages that exist) */}
          <div className="footer-col">
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About STRIDE</Link>
              </li>
              <li>
                <Link to="/order">My Orders</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with High Contrast Copyright */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; 2026 STRIDE Sneaker Store. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.6, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 15 }}
            transition={{ duration: 0.25 }}
            className="back-to-top-btn"
            aria-label="Scroll back to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;