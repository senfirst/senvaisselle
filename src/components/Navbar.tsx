import React, { useState } from "react";
import { Menu, X, ShoppingBag, Search, ChevronRight, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  isAdmin: boolean;
  onLogout: () => void;
  bannerMessage?: string;
  onSearch: (query: string) => void;
}

export default function Navbar({
  currentPage,
  onNavigate,
  isAdmin,
  onLogout,
  bannerMessage = "✨ Livraison rapide sur Dakar et toutes les régions du Sénégal !",
  onSearch,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate("shop");
      setSearchOpen(false);
    }
  };

  const navItems = [
    { label: "Accueil", value: "home" },
    { label: "Boutique", value: "shop" },
    { label: "Catégories", value: "categories" },
    { label: "Promotions", value: "promotions" },
    { label: "Nouveautés", value: "new" },
    { label: "À propos", value: "about" },
    { label: "Contact", value: "contact" },
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white z-40 shadow-sm sticky top-0" id="main-header">
      {/* Top Banner */}
      <div className="bg-[#0A3D91] text-white py-2 px-4 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2 overflow-hidden">
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="truncate"
        >
          {bannerMessage}
        </motion.p>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-container"
        >
          <div className="bg-[#0A3D91] p-2 rounded-lg group-hover:bg-[#F7941D] transition-colors duration-300">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-[#0A3D91] flex items-center gap-0.5">
              SEN<span className="text-[#F7941D]">VAISSELLE</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
              Maison & Cuisine d'Exception
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
                currentPage === item.value
                  ? "text-[#F7941D]"
                  : "text-[#0A3D91] hover:text-[#F7941D]"
              }`}
            >
              {item.label}
              {currentPage === item.value && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7941D]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Instant Search Icon */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-[#0A3D91] hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Rechercher"
            >
              <Search size={20} />
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-100 p-3 z-50 animate-fade-in"
                >
                  <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nom, catégorie, référence..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-[#0A3D91]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#0A3D91] text-white px-3 py-2 rounded-md text-xs font-semibold hover:bg-[#F7941D] transition-colors"
                    >
                      OK
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Navigation */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNavClick("admin-dashboard")}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${
                  currentPage === "admin-dashboard"
                    ? "bg-[#0A3D91] text-white border-[#0A3D91]"
                    : "text-[#0A3D91] border-[#0A3D91] hover:bg-gray-50"
                }`}
              >
                <LayoutDashboard size={14} />
                <span className="hidden sm:inline">Admin</span>
              </button>
              <button
                onClick={onLogout}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                title="Se déconnecter"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick("admin-login")}
              className={`p-2.5 text-[#0A3D91] hover:bg-gray-100 rounded-full transition-colors duration-200`}
              title="Espace Administrateur"
            >
              <LogIn size={20} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#0A3D91] hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-l border-gray-100 lg:hidden"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <span className="text-lg font-black tracking-tight text-[#0A3D91]">
                  SEN<span className="text-[#F7941D]">VAISSELLE</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`flex items-center justify-between text-left px-3 py-2.5 rounded-lg font-semibold text-base transition-colors ${
                      currentPage === item.value
                        ? "bg-[#0A3D91]/5 text-[#F7941D]"
                        : "text-[#0A3D91] hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                    <ChevronRight size={16} className={currentPage === item.value ? "text-[#F7941D]" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              {isAdmin ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavClick("admin-dashboard")}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A3D91] text-white py-3 rounded-xl font-bold text-sm"
                  >
                    <LayoutDashboard size={16} />
                    Tableau de bord Admin
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick("admin-login")}
                  className="w-full flex items-center justify-center gap-2 border border-[#0A3D91] text-[#0A3D91] py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                >
                  <LogIn size={16} />
                  Connexion Admin
                </button>
              )}
              <p className="text-center text-[10px] text-gray-400 mt-4">
                Sen Vaisselle © 2026 • Dakar, Sénégal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
