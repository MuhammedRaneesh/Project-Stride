import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Reveal, fadeUp, staggerContainer } from "../../utils/motion";
import "./Reviews.css";

// ============================================================================
// SET TO TRUE WHEN YOU HAVE REAL REVIEWS TO DISPLAY
// Keeping this false prevents fake customer testimonials from appearing.
// ============================================================================
export const SHOW_REVIEWS = false;

const PLACEHOLDER_REVIEWS = [
  {
    rating: 5,
    quote:
      "PLACEHOLDER REVIEW: Authentic drop arrived in mint condition. Will order again.",
    name: "Customer Name",
    city: "Mumbai",
  },
  {
    rating: 5,
    quote:
      "PLACEHOLDER REVIEW: Delivery was quick, pair verified 100% genuine.",
    name: "Customer Name",
    city: "Bengaluru",
  },
  {
    rating: 5,
    quote:
      "PLACEHOLDER REVIEW: Seamless checkout, excellent packaging and clean fit.",
    name: "Customer Name",
    city: "Delhi",
  },
];

function Reviews() {
  // Guard: Never render fake or unverified reviews
  if (!SHOW_REVIEWS) {
    return null;
  }

  return (
    <section className="reviews-section" aria-label="Customer reviews">
      <div className="reviews-container">
        <Reveal>
          <div className="reviews-eyebrow">COMMUNITY</div>
          <h2 className="reviews-heading">VERIFIED REVIEWS</h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className="reviews-grid"
        >
          {PLACEHOLDER_REVIEWS.map((rev, idx) => (
            <motion.div key={idx} variants={fadeUp} className="review-card">
              <div className="review-stars">
                {[...Array(rev.rating)].map((_, s) => (
                  <FaStar key={s} className="star-icon" />
                ))}
              </div>
              <p className="review-quote">“{rev.quote}”</p>
              <div className="review-author">
                <span className="author-name">{rev.name}</span>
                <span className="author-city">{rev.city}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;
