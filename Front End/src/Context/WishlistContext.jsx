import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

const STORAGE_KEY = "stride_wishlist";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }, [wishlist]);

  const isWishlisted = (productId) => {
    if (!productId) return false;
    const targetId = productId._id || productId.id || productId;
    return wishlist.some((item) => (item._id || item.id) === targetId);
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const prodId = product._id || product.id;

    if (isWishlisted(prodId)) {
      setWishlist((prev) =>
        prev.filter((item) => (item._id || item.id) !== prodId)
      );
      toast.info("Removed from wishlist", { autoClose: 900 });
    } else {
      const cleanItem = {
        _id: prodId,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      };
      setWishlist((prev) => [...prev, cleanItem]);
      toast.success("Added to wishlist ❤️", { autoClose: 900 });
    }
  };

  const removeFromWishlist = (productId) => {
    const prodId = productId._id || productId.id || productId;
    setWishlist((prev) =>
      prev.filter((item) => (item._id || item.id) !== prodId)
    );
    toast.info("Removed from wishlist", { autoClose: 900 });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
