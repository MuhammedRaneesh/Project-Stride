import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaOpencart,
  FaUserCircle,
  FaChevronDown,
  FaSearch,
  FaTimes,
  FaBars,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import api from "../../api/axios";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContex";
import { useWishlist } from "../../Context/WishlistContext";
import { fadeUp, staggerContainer } from "../../utils/motion";
import "./Navbar.css";

function Navbar() {
  const { cart = [] } = useCart();
  const { wishlistCount = 0 } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser, logout } = useAuth();

  const [dropdown, setDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  // Framer-motion scroll observer (no manual scroll listeners)
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHomePage) {
      setIsScrolled(latest > 80);
    }
  });

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 80);
    }
  }, [isHomePage]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setDropdown(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.delete("/auth/logout");
    } catch (error) {
      console.log(error.response?.data?.message || "Logout failed");
    }
    logout();
    setDropdown(false);
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const userName =
    authUser?.username || authUser?.name || authUser?.email?.split("@")[0] || "User";

  const navbarClasses = [
    "navbar",
    isHomePage ? "navbar-landing" : "",
    isHomePage && !isScrolled ? "navbar-transparent" : "navbar-solid",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navbarClasses}>
        <div className="logo-left" onClick={() => navigate("/")}>
          <h1 className="logo">STRIDE</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li className="link">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="link">
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li className="link">
            <NavLink to="/about">About</NavLink>
          </li>
          {authUser && (
            <li className="link">
              <NavLink to="/order">My Orders</NavLink>
            </li>
          )}
        </ul>

        {/* Right side actions */}
        <div className="nav-right">
          {/* Search Toggle Icon */}
          <button
            type="button"
            className="nav-action-btn"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label={searchOpen ? "Close search bar" : "Open search bar"}
          >
            {searchOpen ? (
              <FaTimes className="nav-icon" />
            ) : (
              <FaSearch className="nav-icon" />
            )}
          </button>

          {/* Wishlist Icon with Spring Animated Badge */}
          <NavLink
            to="/shop?filter=wishlist"
            className="cart-wrapper wishlist-wrapper"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            {wishlistCount > 0 ? (
              <FaHeart className="nav-icon" style={{ color: "#ff2d55" }} />
            ) : (
              <FaRegHeart className="nav-icon" />
            )}
            <AnimatePresence mode="wait">
              {wishlistCount > 0 && (
                <motion.span
                  key={wishlistCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="cart-count"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>

          {/* Cart Icon with Spring Animated Badge */}
          <NavLink
            to="/cart"
            className="cart-wrapper"
            aria-label={`Shopping cart with ${cart.length} items`}
          >
            <FaOpencart className="nav-icon" />
            <AnimatePresence mode="wait">
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="cart-count"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>

          {/* User Profile / Auth State */}
          {authUser ? (
            <div className="profile-container">
              <div
                className="profile-trigger"
                onClick={() => setDropdown(!dropdown)}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={dropdown}
              >
                <div className="profile-avatar">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="profile-text">{userName}</span>
                <FaChevronDown
                  className={`arrow-icon ${dropdown ? "rotate" : ""}`}
                />
              </div>

              {dropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <h3>{userName}</h3>
                    <p>{authUser.email}</p>
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setDropdown(false);
                      navigate("/shop?filter=wishlist");
                    }}
                  >
                    My Wishlist ({wishlistCount})
                  </div>
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setDropdown(false);
                      navigate("/order");
                    }}
                  >
                    My Orders
                  </div>
                  <div
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="login-btn desktop-only"
            >
              Login
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <FaBars className="nav-icon" />
          </button>
        </div>
      </nav>

      {/* Slide-down Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className={`navbar-search-bar ${
              isHomePage && !isScrolled ? "transparent-search" : ""
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="search-form-inner">
              <FaSearch className="search-input-icon" />
              <input
                type="text"
                placeholder="Search sneakers (e.g. Nike, Retro, Speedcat)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input-field"
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="search-close-btn"
                aria-label="Close search"
              >
                <FaTimes />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-overlay"
          >
            <div className="mobile-overlay-header">
              <span
                className="logo"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
              >
                STRIDE
              </span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <motion.ul
              variants={staggerContainer(0.08, 0.05)}
              initial="hidden"
              animate="visible"
              className="mobile-overlay-links"
            >
              <motion.li variants={fadeUp}>
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </NavLink>
              </motion.li>
              <motion.li variants={fadeUp}>
                <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)}>
                  Shop All
                </NavLink>
              </motion.li>
              <motion.li variants={fadeUp}>
                <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                  About Stride
                </NavLink>
              </motion.li>
              <motion.li variants={fadeUp}>
                <NavLink
                  to="/shop?filter=wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Wishlist ({wishlistCount})
                </NavLink>
              </motion.li>
              {authUser && (
                <motion.li variants={fadeUp}>
                  <NavLink to="/order" onClick={() => setMobileMenuOpen(false)}>
                    My Orders
                  </NavLink>
                </motion.li>
              )}
            </motion.ul>

            <div className="mobile-overlay-footer">
              {authUser ? (
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  Logout ({userName})
                </button>
              ) : (
                <button
                  className="login-btn mobile-full-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;