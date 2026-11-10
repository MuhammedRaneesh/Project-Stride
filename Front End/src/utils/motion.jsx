import { motion } from "framer-motion";

// Custom street-luxe easing
export const EASING = [0.2, 0.7, 0.2, 1];

// Reusable fade up variant
export const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASING,
    },
  },
};

// Reusable scale & fade variant
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 25 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASING,
    },
  },
};

// Reusable stagger container variant
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Reusable in-view reveal wrapper (once: false ensures animations re-trigger on upward/downward scroll)
export function Reveal({
  children,
  className = "",
  variants = fadeUp,
  amount = 0.15,
  once = false,
  ...props
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
