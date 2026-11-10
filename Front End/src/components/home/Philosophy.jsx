import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASING, Reveal, fadeUp, staggerContainer } from "../../utils/motion";
import "./Philosophy.css";

const PHILOSOPHY_TEXT =
  "STRIDE blends luxury with street energy. Crafted for those who move fast, think bold, and refuse limits. Every step is power. Every stride is identity.";

const HIGHLIGHTS = [
  { title: "Authentic", note: "100% verified drops" },
  { title: "Fast Delivery", note: "Express tracked shipping" },
  { title: "Easy Returns", note: "Hassle-free exchanges" },
];

function Word({ children, progress, range, isBrand }) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <span className="word-wrapper">
      <motion.span
        style={{ opacity }}
        className={isBrand ? "brand-name-pink" : ""}
      >
        {children}
      </motion.span>{" "}
    </span>
  );
}

function Philosophy() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = PHILOSOPHY_TEXT.split(" ");

  return (
    <section ref={containerRef} className="philosophy-sec" aria-label="Our philosophy">
      <div className="philosophy-container">
        <Reveal once={false}>
          <div className="philosophy-eyebrow">OUR PHILOSOPHY</div>
        </Reveal>

        <p className="philosophy-text">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const isBrand = word.toUpperCase().includes("STRIDE");

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                isBrand={isBrand}
              >
                {word}
              </Word>
            );
          })}
        </p>

        {/* 3 Highlights with animated drawing underline */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="philosophy-highlights"
        >
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp} className="highlight-item">
              <div className="highlight-title">{item.title}</div>
              <div className="highlight-note">{item.note}</div>
              <motion.span
                className="highlight-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + idx * 0.15,
                  ease: EASING,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Philosophy;
