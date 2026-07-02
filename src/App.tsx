import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

// Types
import { Product, Category, ShopInfo } from "./types";

// Data
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_SHOP_INFO,
} from "./data/initialData";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloating from "./components/WhatsAppFloating";
import ProductDetailsModal from "./components/ProductDetailsModal";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  // Persistent core state loaded from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem("sv_products");
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const local = localStorage.getItem("sv_categories");
    return local ? JSON.parse(local) : INITIAL_CATEGORIES;
  });

  const [shopInfo, setShopInfo] = useState<ShopInfo>(() => {
    const local = localStorage.getItem("sv_shop_info");
    return local ? JSON.parse(local) : INITIAL_SHOP_INFO;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem("sv_is_admin") === "true";
  });

  // Navigation
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [routeParams, setRouteParams] = useState<any>(null);

  // Active product details view
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Global search trigger from Navbar
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem("sv_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("sv_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("sv_shop_info", JSON.stringify(shopInfo));
  }, [shopInfo]);

  // Handle Admin Authorization
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    sessionStorage.setItem("sv_is_admin", "true");
    setCurrentPage("admin-dashboard");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("sv_is_admin");
    setCurrentPage("home");
  };

  // Safe navigation function
  const handleNavigate = (page: string, params: any = null) => {
    setCurrentPage(page);
    setRouteParams(params);
    setSearchQuery(""); // Reset search parameter unless explicitly set
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchFromHeader = (query: string) => {
    setSearchQuery(query);
    setRouteParams({ search: query });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-gray-800" id="app-root">
      {/* Header bar and sticky alert banner */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        bannerMessage={shopInfo.bannerMessage}
        onSearch={handleSearchFromHeader}
      />

      {/* Primary Page Route Coordinator with motion layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {currentPage === "home" && (
              <Home
                products={products}
                categories={categories}
                onNavigate={handleNavigate}
                onViewProduct={setSelectedProduct}
              />
            )}

            {currentPage === "shop" && (
              <Shop
                products={products}
                categories={categories}
                initialCategory={routeParams?.category || ""}
                initialSearch={routeParams?.search || searchQuery || ""}
                initialPromoOnly={routeParams?.promoOnly || false}
                initialNewOnly={routeParams?.newOnly || false}
                onViewProduct={setSelectedProduct}
              />
            )}

            {currentPage === "categories" && (
              <Categories
                categories={categories}
                products={products}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === "promotions" && (
              <Shop
                products={products}
                categories={categories}
                initialPromoOnly={true}
                onViewProduct={setSelectedProduct}
              />
            )}

            {currentPage === "new" && (
              <Shop
                products={products}
                categories={categories}
                initialNewOnly={true}
                onViewProduct={setSelectedProduct}
              />
            )}

            {currentPage === "about" && (
              <About
                shopInfo={shopInfo}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === "contact" && (
              <Contact
                shopInfo={shopInfo}
              />
            )}

            {currentPage === "admin-login" && (
              <AdminLogin
                onLoginSuccess={handleLoginSuccess}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === "admin-dashboard" && (
              isAdmin ? (
                <AdminDashboard
                  products={products}
                  categories={categories}
                  shopInfo={shopInfo}
                  onUpdateProducts={setProducts}
                  onUpdateCategories={setCategories}
                  onUpdateShopInfo={setShopInfo}
                />
              ) : (
                <AdminLogin
                  onLoginSuccess={handleLoginSuccess}
                  onNavigate={handleNavigate}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer information bar */}
      <Footer onNavigate={handleNavigate} shopInfo={shopInfo} />

      {/* Elegant floating WhatsApp communication button on all screens */}
      <WhatsAppFloating />

      {/* Overlay modal for detailed product viewing and custom WhatsApp flow */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
