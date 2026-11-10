import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import CheckOut from "./Pages/CheckOut";
import OrderPage from "./Pages/OrderPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminOrders from "./Pages/Admin/AdminOrders";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Error from "./Pages/Error";
import Edit from "./Pages/Admin/Edit";
import AddProduct from "./Pages/Admin/AddProduct";
import About from "./Pages/About";

// Snappy subtle page fade & slide transition
const pageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.2, 0.7, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.16, ease: [0.2, 0.7, 0.2, 1] },
  },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageMotion}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/shop"
          element={
            <PageTransition>
              <Shop />
            </PageTransition>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <PageTransition>
              <ProductDetails />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/Register"
          element={
            <PageTransition>
              <Signup />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <Error />
            </PageTransition>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <PageTransition>
                <OrderPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <PageTransition>
                <CartPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="editproduct/:id" element={<Edit />} />
          <Route path="Addproduct" element={<AddProduct />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <PageTransition>
                <CheckOut />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
