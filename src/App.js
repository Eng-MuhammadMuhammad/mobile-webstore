import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./contexts/ThemeContext";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const UserDashboardPage = lazy(() => import("./pages/UserDashboardPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DealsPage = lazy(() => import('./pages/DealsPage'));
const NewArrivalsPage = lazy(() => import('./pages/NewArrivalsPage'));

function App() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <Header />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/deals" element={<DealsPage />} />
            <Route path="/products/new" element={<NewArrivalsPage />} />
            <Route
              path="/products/:category"
              element={<ProductListingPage />}
            />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard/*" element={<UserDashboardPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/admin/*" element={<AdminDashboardPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
