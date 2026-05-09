import "./About.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function About() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="about-content-wrapper">
        <section className="about-narrative">
          <div className="narrative-text">
            <span className="accent-tag">Since 2026</span>
            <h2>More Than a Sneaker Store</h2>
            <p>
              STRIDE is born at the intersection of street culture and premium innovation. 
              We combine curated aesthetics with performance design to help you step into 
              tomorrow with absolute confidence.
            </p>
            <div className="mission-highlight">
              <h3>Our Mission</h3>
              <p>To deliver stylish, high-quality sneakers that blend comfort, performance, and everyday lifestyle.</p>
            </div>
          </div>
          <div className="narrative-image">
            <img src="https://images.pexels.com/photos/31507738/pexels-photo-31507738.jpeg" alt="Sneaker Culture" />
          </div>
        </section>

        <section className="why-us-grid">
          <div className="why-card">
            <span className="why-icon">🏆</span>
            <h4>Premium Brands</h4>
            <p>100% Authentic collections from global leaders.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">🔒</span>
            <h4>Secure Payments</h4>
            <p>Industry-leading encryption for every transaction.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">⚡</span>
            <h4>Fast Delivery</h4>
            <p>Rapid shipping to get you on the move faster.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💬</span>
            <h4>Expert Support</h4>
            <p>24/7 assistance for all your footwear needs.</p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;