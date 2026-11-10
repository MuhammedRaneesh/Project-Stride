import { motion } from "framer-motion";
import { Reveal, fadeUp, staggerContainer } from "../../utils/motion";
import "./WhyStride.css";

// ============================================================================
// EDITABLE FEATURES LIST — Replace or adjust features anytime
// ============================================================================
const FEATURES = [
  {
    num: "01",
    title: "100% AUTHENTIC",
    desc: "Every pair is verified and guaranteed original through multi-point expert inspection.",
  },
  {
    num: "02",
    title: "EXPRESS DISPATCH",
    desc: "Fast doorstep fulfillment with real-time end-to-end tracking on all orders.",
  },
  {
    num: "03",
    title: "EFFORTLESS RETURNS",
    desc: "Hassle-free 7-day exchange guarantee if the size or silhouette isn't perfect.",
  },
  {
    num: "04",
    title: "ENCRYPTED CHECKOUT",
    desc: "256-bit bank-grade encryption with instant UPI, Cards, and Net Banking protection.",
  },
];

function WhyStride() {
  return (
    <section className="why-stride-section" aria-label="Why choose Stride">
      <div className="why-stride-container">
        <Reveal once={false}>
          <div className="why-eyebrow">THE STANDARD</div>
          <h2 className="why-heading">WHY CHOOSE STRIDE</h2>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.12, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="why-grid"
        >
          {FEATURES.map((item) => (
            <motion.div key={item.num} variants={fadeUp} className="why-card">
              <span className="why-num">{item.num}</span>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyStride;
