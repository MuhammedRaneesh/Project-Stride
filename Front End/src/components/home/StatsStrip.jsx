import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/motion";
import "./StatsStrip.css";

// ============================================================================
// EDITABLE STATS PLACEHOLDER DATA — Replace targets and labels with real data
// ============================================================================
const STATS_DATA = [
  { target: 15000, suffix: "+", decimals: 0, label: "PAIRS DELIVERED" },
  { target: 100, suffix: "%", decimals: 0, label: "VERIFIED AUTHENTIC" },
  { target: 48, suffix: "h", decimals: 0, label: "AVG. DISPATCH TIME" },
  { target: 4.9, suffix: "/5", decimals: 1, label: "CUSTOMER RATING" },
];

function Counter({ target, suffix = "", decimals = 0 }) {
  const [val, setVal] = useState(0);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }

    // Count up from 0 when in view with an ease-out curve
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setVal(latest),
    });

    return () => controls.stop();
  }, [inView, target]);

  const displayString =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString("en-IN");

  return (
    <span ref={nodeRef} className="stat-value">
      {displayString}
      {suffix}
    </span>
  );
}

function StatsStrip() {
  return (
    <section className="stats-strip-section" aria-label="Key store statistics">
      <div className="stats-container">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="stats-grid"
        >
          {STATS_DATA.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="stat-item">
              <Counter
                target={item.target}
                suffix={item.suffix}
                decimals={item.decimals}
              />
              <span className="stat-label">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsStrip;
