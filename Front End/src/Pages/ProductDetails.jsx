import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../api/axios";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useCart } from "../Context/CartContex";
import { useAuth } from "../Context/AuthContext";
import { useWishlist } from "../Context/WishlistContext";
import "./prouduct.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setloading] = useState(true);
  const [size, setSize] = useState(null);
  const { authUser } = useAuth();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setloading(false);
      })
      .catch((data) => {
        console.log(data);
        toast.error("product not Found");
        navigate("/shop");
      });
  }, [id, navigate]);

  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQty() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  async function handleAddToCart() {
    if (!authUser) {
      toast.error("You must login first");
      setTimeout(() => {
        navigate("/");
      }, 2000);
      return;
    }
    if (!size) {
      toast.error("Please select a shoe size");
      return;
    }
    try {
      await addToCart(product, size, quantity);
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add");
    }
  }

  if (loading) {
    return <div className="loading">Loading Shoe Details...</div>;
  }

  if (!product) {
    return (
      <div className="opposite-loading">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/shop")}>← Go back to Shop</button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product._id);

  return (
    <div>
      <Navbar />
      <div className="continer">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div>
          <div className="image-box">
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="info-product">
          <span className="brand-info">{product.brand}</span>

          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>

          <h2 className="price">₹{Number(product.price).toLocaleString("en-IN")}</h2>
          <div>
            <div className="size-button">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={size === s ? "size-butt-active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="quantity-section">
            <p>Quantity</p>
            <div className="quantity-controls">
              <button onClick={decreaseQty}>−</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          </div>
          <div className="action-buttons">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              type="button"
              className={`details-wishlist-btn ${wishlisted ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {wishlisted ? (
                <>
                  <FaHeart style={{ color: "#ff2d55", marginRight: "8px" }} />
                  Wishlisted
                </>
              ) : (
                <>
                  <FaRegHeart style={{ marginRight: "8px" }} />
                  Add to Wishlist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
