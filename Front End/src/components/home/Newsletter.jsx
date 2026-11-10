import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../../utils/motion";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // =========================================================================
    // TODO: Connect this to backend newsletter endpoint when created:
    // await api.post("/newsletter", { email: email.trim() });
    // =========================================================================
    setSubmitted(true);
  };

  return (
    <section className="newsletter-section" aria-label="Newsletter subscription">
      <div className="newsletter-container">
        <Reveal>
          <div className="newsletter-eyebrow">EXCLUSIVE ACCESS</div>
          <h2 className="newsletter-heading">NEVER MISS A DROP</h2>
          <p className="newsletter-sub">
            Be the first to know when limited releases, fresh restocks, and secret street drops land.
          </p>
        </Reveal>

        <Reveal amount={0.3}>
          <div className="newsletter-form-wrapper">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="newsletter-success"
                >
                  <span className="success-icon">✓</span>
                  <h3>YOU&apos;RE ON THE LIST</h3>
                  <p>Check your inbox soon for your exclusive welcome drop.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="newsletter-form"
                >
                  <div className="newsletter-input-group">
                    <input
                      type="email"
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className={`newsletter-input ${error ? "has-error" : ""}`}
                      aria-label="Email address for newsletter"
                      aria-invalid={Boolean(error)}
                    />
                    <button type="submit" className="newsletter-submit-btn">
                      SUBSCRIBE
                    </button>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="newsletter-error-text"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Newsletter;
