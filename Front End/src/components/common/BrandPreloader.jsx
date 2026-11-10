import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BrandPreloader.css";

const EASING = [0.76, 0, 0.24, 1];

function BrandPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock background scrolling while preloader is visible
    document.body.style.overflow = "hidden";

    // Smooth count-up timer over ~1.6 seconds
    const startTime = performance.now();
    const duration = 1600;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Ease-out curve for natural deceleration as it approaches 100%
      const easedProgress = Math.round(
        (1 - Math.pow(1 - progressFraction, 2.5)) * 100
      );

      setProgress(easedProgress);

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
        }, 250);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animFrame);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsDone(true);
  };

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isDone && (
        <motion.div
          key="brand-preloader"
          className="brand-preloader-curtain"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASING }}
        >
          {/* Subtle Skip button */}
          <button
            type="button"
            className="preloader-skip-btn"
            onClick={handleSkip}
            aria-label="Skip intro animation"
          >
            SKIP
          </button>

          {/* Center Brand Hero */}
          <div className="preloader-center-content">
            <motion.span
              className="preloader-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              NEW SEASON 2026
            </motion.span>

            {/* STRIDE Animated Letters */}
            <h1 className="preloader-title">
              {["S", "T", "R", "I", "D", "E"].map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="preloader-letter"
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="preloader-dot"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                .
              </motion.span>
            </h1>

            <motion.p
              className="preloader-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              STEP INTO TOMORROW
            </motion.p>

            {/* Percentage Counter & Slim Track */}
            <div className="preloader-progress-box">
              <div className="preloader-counter">
                <span className="counter-num">
                  {progress < 10 ? `0${progress}` : progress}
                </span>
                <span className="counter-symbol">%</span>
              </div>

              <div className="preloader-track">
                <motion.div
                  className="preloader-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Footer watermark */}
          <div className="preloader-watermark">
            <span>STREET CULTURE DEFINED</span>
            <span>STRIDE &copy; 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BrandPreloader;
