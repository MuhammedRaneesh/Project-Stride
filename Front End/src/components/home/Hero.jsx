import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { EASING } from "../../utils/motion";
import "./Hero.css";

// Module-level flag: ensures the loader only plays on initial website open, never on route changes
let hasHeroLoadedOnce = false;

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(hasHeroLoadedOnce);

  useEffect(() => {
    if (hasHeroLoadedOnce) return;

    // Deliberate ~2.2s duration on initial site open
    const timer = setTimeout(() => {
      hasHeroLoadedOnce = true;
      setIsVideoLoaded(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Scroll-linked parallax and content fade
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 75]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Masked line reveal variants
  const lineVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: (custom) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: EASING,
        delay: 0.2 + custom * 0.15,
      },
    }),
  };

  return (
    <div ref={heroRef} className="hero-section">
      {/* Sleek Loader Inside the Banner */}
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div
            key="hero-banner-loader"
            className="hero-banner-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASING }}
          >
            <div className="banner-loader-inner">
              <div className="banner-loader-spinner-box">
                <div className="banner-spinner-ring" />
                <div className="banner-spinner-core" />
              </div>

              <div className="banner-loader-text-group">
                <span className="banner-loader-brand">STRIDE</span>
                <span className="banner-loader-status">
                  LOADING SNEAKER EXPERIENCE
                  <span className="status-dots">...</span>
                </span>
              </div>

              <div className="banner-loader-bar">
                <div className="banner-loader-bar-fill" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Video with Parallax & Fade-in */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className={`background-container ${
          isVideoLoaded ? "video-ready" : "video-loading"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source
            src="/coverr-sneakers-on-a-step-machine-6641-1080p.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Hero Foreground Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="hero-content"
      >
        <div className="content-wrapper">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={isVideoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASING }}
            className="eyebrow"
          >
            STRIDE
          </motion.span>

          <h1 className="headline">
            <span className="hero-line-mask">
              <motion.span
                custom={0}
                variants={lineVariants}
                initial="hidden"
                animate={isVideoLoaded ? "visible" : "hidden"}
                className="line"
              >
                Step Into
              </motion.span>
            </span>
            <span className="hero-line-mask">
              <motion.span
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate={isVideoLoaded ? "visible" : "hidden"}
                className="line"
              >
                Tomorrow
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVideoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASING }}
            className="subheadline"
          >
            Where innovation meets street culture. Discover the future of footwear.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isVideoLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASING }}
            className="cta-group"
          >
            <Link to="/shop" className="cta-primary">
              Explore Collection
              <span className="arrow">→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
