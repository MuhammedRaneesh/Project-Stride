import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import Philosophy from "../components/home/Philosophy";
import BrandStrip from "../components/common/BrandStrip";
import LatestDrops from "../components/home/LatestDrops";
import ShopByCategory from "../components/home/ShopByCategory";
import StatsStrip from "../components/home/StatsStrip";
import PromoBanner from "../components/home/PromoBanner";
import WhyStride from "../components/home/WhyStride";
import Reviews from "../components/home/Reviews";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div className="home-page-wrapper">
      {/* Navigation */}
      <Navbar />

      {/* Main Home Page Content Sections */}
      <main id="main-content">
        <Hero />
        <Philosophy />
        <BrandStrip />
        <LatestDrops />
        <ShopByCategory />
        <StatsStrip />
        <PromoBanner />
        <WhyStride />
        <Reviews />
        <Newsletter />
      </main>

      {/* Footer with Back to Top */}
      <Footer />
    </div>
  );
}

export default Home;