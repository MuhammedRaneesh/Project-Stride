import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useWishlist } from "../Context/WishlistContext";
import "./Shop.css";

const BRANDS = ["ALL", "Nike", "Adidas", "Puma", "New Balance"];

function normalizeBrand(b) {
  if (!b || b === "ALL") return "ALL";
  const lower = b.toLowerCase().replace(/-/g, " ").trim();
  if (lower === "nike") return "Nike";
  if (lower === "adidas") return "Adidas";
  if (lower === "puma") return "Puma";
  if (lower === "new balance") return "New Balance";
  return b;
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, isWishlisted, toggleWishlist } = useWishlist();

  const urlKeyword = searchParams.get("keyword") || searchParams.get("search") || "";
  const urlBrand = searchParams.get("brand") || "ALL";
  const urlCategory = searchParams.get("category") || "";
  const isWishlistFilter = searchParams.get("filter") === "wishlist";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(urlKeyword);
  const [activeBrand, setActiveBrand] = useState(normalizeBrand(urlBrand));
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const limit = 12;

  // Sync state when URL params change (e.g. from Navbar search or brand links)
  useEffect(() => {
    setSearch(urlKeyword);
    setActiveBrand(normalizeBrand(urlBrand));
    setPage(1);
  }, [urlKeyword, urlBrand, urlCategory, isWishlistFilter]);

  // Fetch products from backend
  useEffect(() => {
    // If viewing wishlist mode, products are derived from local wishlist state
    if (isWishlistFilter) {
      setProducts(wishlist);
      setPagination(null);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", limit);

    if (search.trim()) {
      params.set("keyword", search.trim());
    }
    if (activeBrand !== "ALL") {
      params.set("brand", activeBrand);
    }
    if (urlCategory) {
      params.set("category", urlCategory);
    }

    api
      .get(`/products?${params.toString()}`)
      .then((res) => {
        setProducts(res.data.products || []);
        setPagination(res.data.pagination || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        toast.error("Could not load products");
        setLoading(false);
      });
  }, [search, activeBrand, urlCategory, page, isWishlistFilter, wishlist]);

  const handleBrandClick = (brand) => {
    setActiveBrand(brand);
    setPage(1);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("filter"); // exit wishlist mode if any
    if (brand === "ALL") {
      newParams.delete("brand");
    } else {
      newParams.set("brand", brand);
    }
    setSearchParams(newParams);
  };

  const handleWishlistTabClick = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isWishlistFilter) {
      newParams.delete("filter");
    } else {
      newParams.set("filter", "wishlist");
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);

    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set("keyword", val.trim());
    } else {
      newParams.delete("keyword");
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("keyword");
    newParams.delete("search");
    setSearchParams(newParams);
  };

  return (
    <>
      <Navbar />
      <div className="page-shop">
        {/* Filter and Search Bar */}
        <div className="filter-header">
          <div className="brand-filter">
            {BRANDS.map((b) => (
              <button
                key={b}
                className={!isWishlistFilter && activeBrand === b ? "active" : ""}
                onClick={() => handleBrandClick(b)}
              >
                {b}
              </button>
            ))}

            <button
              className={`wishlist-tab-btn ${isWishlistFilter ? "active" : ""}`}
              onClick={handleWishlistTabClick}
              title="View your saved wishlist"
            >
              ❤️ Wishlist ({wishlist.length})
            </button>
          </div>

          <div className="search-box">
            <input
              type="text"
              value={search}
              placeholder="Search products, brands..."
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <hr />

        {/* Status text if active filters */}
        {(search || activeBrand !== "ALL" || urlCategory || isWishlistFilter) && (
          <div className="active-filter-indicator">
            <span>
              {isWishlistFilter
                ? `Showing Wishlist (${products.length} items)`
                : `Showing results ${search ? `for "${search}"` : ""} ${
                    activeBrand !== "ALL" ? `in ${activeBrand}` : ""
                  }`}
            </span>
            {(search || activeBrand !== "ALL" || isWishlistFilter) && (
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSearch("");
                  setActiveBrand("ALL");
                  setSearchParams({});
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="products-container">
          {loading ? (
            <p className="shop-status-text">Loading sneakers...</p>
          ) : products.length > 0 ? (
            products.map((item) => {
              const wishlisted = isWishlisted(item._id);
              return (
                <div key={item._id} className="product-card">
                  {/* Wishlist Button */}
                  <button
                    type="button"
                    className="shop-wishlist-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    aria-label={
                      wishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlisted ? (
                      <FaHeart className="shop-heart-icon filled" />
                    ) : (
                      <FaRegHeart className="shop-heart-icon" />
                    )}
                  </button>

                  <Link to={`/shop/${item._id}`} className="shop-card-link">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                    />
                    <span className="shop-brand-name">{item.brand}</span>
                    <h3 className="shop-product-title">{item.name}</h3>
                    <p className="price">₹{Number(item.price).toLocaleString("en-IN")}</p>
                  </Link>

                  <Link to={`/shop/${item._id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="empty-shop-state">
              <p>
                {isWishlistFilter
                  ? "Your wishlist is currently empty."
                  : "No products matched your search."}
              </p>
              {isWishlistFilter ? (
                <button
                  className="shop-browse-btn"
                  onClick={() => setSearchParams({})}
                >
                  Explore Drops
                </button>
              ) : (
                <button
                  className="shop-browse-btn"
                  onClick={() => {
                    setSearch("");
                    setActiveBrand("ALL");
                    setSearchParams({});
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {!isWishlistFilter && pagination && pagination.totalPages > 1 && (
          <div className="pagination-controls">
            <button
              disabled={page === 1}
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                window.scrollTo({ top: 180, behavior: "smooth" });
              }}
            >
              Previous
            </button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={page === pagination.totalPages}
              onClick={() => {
                setPage((prev) => prev + 1);
                window.scrollTo({ top: 180, behavior: "smooth" });
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Shop;
