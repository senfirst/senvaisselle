import React, { useState, useEffect, useMemo } from "react";
import { Search, SlidersHorizontal, Check, ArrowUpDown, X, ListFilter, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";

interface ShopProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
  initialPromoOnly?: boolean;
  initialNewOnly?: boolean;
  onViewProduct: (product: Product) => void;
}

export default function Shop({
  products,
  categories,
  initialCategory = "",
  initialSearch = "",
  initialPromoOnly = false,
  initialNewOnly = false,
  onViewProduct,
}: ShopProps) {
  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "inStock" | "outOfStock">("all");
  const [promoOnly, setPromoOnly] = useState(initialPromoOnly);
  const [newOnly, setNewOnly] = useState(initialNewOnly);
  const [sortBy, setSortBy] = useState<"newest" | "priceAsc" | "priceDesc" | "alphabetical">("newest");

  // Mobile filters panel toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync initial parameters when they change
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (initialPromoOnly) setPromoOnly(initialPromoOnly);
  }, [initialPromoOnly]);

  useEffect(() => {
    if (initialNewOnly) setNewOnly(initialNewOnly);
  }, [initialNewOnly]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxPrice(100000);
    setAvailabilityFilter("all");
    setPromoOnly(false);
    setNewOnly(false);
    setSortBy("newest");
  };

  // Filtered and Sorted Products
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    // Search Query (Matches Name, Reference, Description, Material, Category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.ref.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query)
      );
    }

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price Filter
    filtered = filtered.filter((p) => p.price <= maxPrice);

    // Availability Filter
    if (availabilityFilter === "inStock") {
      filtered = filtered.filter((p) => p.isAvailable && p.stock > 0);
    } else if (availabilityFilter === "outOfStock") {
      filtered = filtered.filter((p) => !p.isAvailable || p.stock <= 0);
    }

    // Promo Only Filter
    if (promoOnly) {
      filtered = filtered.filter((p) => p.isPromo);
    }

    // New Only Filter
    if (newOnly) {
      filtered = filtered.filter((p) => p.isNew);
    }

    // Sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sortBy === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, maxPrice, availabilityFilter, promoOnly, newOnly, sortBy]);

  return (
    <div className="bg-white min-h-screen py-10" id="shop-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-left mb-8">
          <span className="text-xs font-bold text-[#F7941D] uppercase tracking-widest font-mono">Boutique Officielle</span>
          <h1 className="text-3xl font-black text-[#0A3D91] tracking-tight mt-1">Catalogue de Produits</h1>
          <p className="text-xs text-gray-500 mt-2">
            Explorez notre sélection premium de vaisselle et d'articles ménagers. Commandez directement via WhatsApp en un seul clic.
          </p>
        </div>

        {/* Filters and Search Bar Top */}
        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Quick search input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom, référence, matière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#0A3D91] focus:ring-1 focus:ring-[#0A3D91] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick controls */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 shrink-0">
            {/* Sorting Selection */}
            <div className="flex items-center gap-2 bg-white px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-600">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                <option value="newest">Nouveautés d'abord</option>
                <option value="priceAsc">Prix croissant</option>
                <option value="priceDesc">Prix décroissant</option>
                <option value="alphabetical">Ordre alphabétique</option>
              </select>
            </div>

            {/* Mobile Filters Toggle Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-white px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <SlidersHorizontal size={14} />
              Filtres
            </button>
          </div>
        </div>

        {/* Shop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters (Desktop only) */}
          <aside className="hidden lg:block space-y-6 text-left bg-gray-50 border border-gray-100/50 p-6 rounded-2xl h-fit sticky top-24">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#0A3D91] uppercase tracking-wide flex items-center gap-1.5">
                <ListFilter size={16} /> Filtres
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                Réinitialiser
              </button>
            </div>

            {/* Categories filter */}
            <div className="space-y-2 text-left">
              <h3 className="text-[#0A3D91] font-bold text-xs uppercase tracking-widest mb-3">Nos Univers</h3>
              <div className="flex flex-col space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full flex items-center justify-between group p-2 transition-all ${
                    !selectedCategory
                      ? "bg-white shadow-xs border-l-4 border-[#F7941D] font-semibold text-[#0A3D91] text-xs"
                      : "rounded-md hover:bg-white hover:shadow-xs text-slate-600 text-xs hover:text-[#0A3D91]"
                  }`}
                >
                  <span className={!selectedCategory ? "font-semibold" : ""}>Toutes les catégories</span>
                  <span className="text-xs text-slate-400 font-mono">{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                  const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between group p-2 transition-all ${
                        isActive
                          ? "bg-white shadow-xs border-l-4 border-[#F7941D] font-semibold text-[#0A3D91] text-xs"
                          : "rounded-md hover:bg-white hover:shadow-xs text-slate-600 text-xs hover:text-[#0A3D91]"
                      }`}
                    >
                      <span className={`truncate ${isActive ? "font-semibold" : ""}`}>{cat.name}</span>
                      <span className="text-xs text-slate-400 font-mono">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Prix Maximum</span>
                <span className="font-bold text-[#0A3D91] font-mono">
                  {new Intl.NumberFormat("fr-FR").format(maxPrice)} FCFA
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="150000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0A3D91] h-1 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>1 000 F</span>
                <span>150 000 F</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-gray-400">Disponibilité</h4>
              <div className="space-y-1.5">
                {[
                  { label: "Tous les produits", value: "all" },
                  { label: "En Stock uniquement", value: "inStock" },
                  { label: "Rupture de Stock", value: "outOfStock" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setAvailabilityFilter(item.value as any)}
                    className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg font-semibold transition-all ${
                      availabilityFilter === item.value
                        ? "text-[#0A3D91] bg-[#0A3D91]/5 font-bold"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                      availabilityFilter === item.value ? "border-[#0A3D91] bg-[#0A3D91] text-white" : "border-gray-300"
                    }`}>
                      {availabilityFilter === item.value && <Check size={10} className="stroke-[3]" />}
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Specials (Promo / New) */}
            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-gray-400">Offres & Nouveautés</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setPromoOnly(!promoOnly)}
                  className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg font-semibold transition-all ${
                    promoOnly ? "text-[#F7941D] bg-orange-50 font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                    promoOnly ? "border-[#F7941D] bg-[#F7941D] text-white" : "border-gray-300"
                  }`}>
                    {promoOnly && <Check size={10} className="stroke-[3]" />}
                  </div>
                  En promotion uniquement
                </button>

                <button
                  onClick={() => setNewOnly(!newOnly)}
                  className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg font-semibold transition-all ${
                    newOnly ? "text-[#0A3D91] bg-blue-50 font-bold" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                    newOnly ? "border-[#0A3D91] bg-[#0A3D91] text-white" : "border-gray-300"
                  }`}>
                    {newOnly && <Check size={10} className="stroke-[3]" />}
                  </div>
                  Nouveautés uniquement
                </button>
              </div>
            </div>

            {/* Sidebar Promo Block */}
            <div className="bg-[#F7941D]/10 p-4 rounded-xl border border-[#F7941D]/20 mt-6 text-left">
              <span className="text-[#F7941D] text-xs font-bold uppercase mb-1 block">Offre Table Royale</span>
              <p className="text-[11px] text-slate-600 leading-normal mb-3">
                Bénéficiez de -15% sur les couverts dorés à l'achat d'un service d'assiettes de 24 pièces chez Sen Vaisselle.
              </p>
              <button 
                onClick={() => {
                  const url = "https://wa.me/221788626180?text=Bonjour,%20je%20souhaite%20profiter%20de%20l%27offre%20Table%20Royale.";
                  window.open(url, "_blank");
                }}
                className="w-full bg-[#0A3D91] hover:bg-[#F7941D] text-white py-2 rounded text-[10px] font-bold uppercase transition-colors"
              >
                Profiter de l'offre
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active filters display tags */}
            {(selectedCategory || searchQuery || availabilityFilter !== "all" || promoOnly || newOnly) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mr-1">Filtres actifs:</span>
                {searchQuery && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    Recherche: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="bg-[#0A3D91]/10 text-[#0A3D91] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {availabilityFilter !== "all" && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    {availabilityFilter === "inStock" ? "En stock" : "Ruptures"}
                    <button onClick={() => setAvailabilityFilter("all")} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {promoOnly && (
                  <span className="bg-[#F7941D]/10 text-[#F7941D] text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    En Promotion
                    <button onClick={() => setPromoOnly(false)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                {newOnly && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    Nouveautés
                    <button onClick={() => setNewOnly(false)} className="hover:text-red-500"><X size={12} /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#0A3D91] font-bold underline hover:text-[#F7941D] ml-2"
                >
                  Tout effacer
                </button>
              </div>
            )}

            {/* Results count indicator */}
            <p className="text-xs text-gray-400 font-mono mb-4 text-left">
              Affichage de {processedProducts.length} produit(s) sur {products.length} au total
            </p>

            {processedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {processedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onViewDetails={onViewProduct} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-12 text-center max-w-lg mx-auto my-10 space-y-4">
                <div className="bg-gray-100 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Aucun produit ne correspond</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Nous n'avons trouvé aucun article correspondant à vos filtres de recherche. Essayez d'élargir vos critères ou de réinitialiser vos filtres.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0A3D91] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#F7941D] transition-all duration-300"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden" id="mobile-filters-drawer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            ></motion.div>

            {/* Drawer body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto text-left"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-black text-sm text-[#0A3D91] uppercase tracking-wide">Filtres de recherche</h3>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Catégories</h4>
                  <div className="space-y-1 max-h-44 overflow-y-auto pr-2 scrollbar-thin text-xs">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className={`w-full flex items-center justify-between text-left px-2.5 py-2 rounded-lg font-semibold transition-all ${
                        !selectedCategory ? "bg-[#0A3D91] text-white" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>Toutes les catégories</span>
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full flex items-center justify-between text-left px-2.5 py-2 rounded-lg font-semibold transition-all ${
                          selectedCategory.toLowerCase() === cat.name.toLowerCase()
                            ? "bg-[#0A3D91] text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span className="font-bold text-gray-400 uppercase tracking-wider">Prix Maximum</span>
                    <span className="font-bold text-[#0A3D91] font-mono">
                      {new Intl.NumberFormat("fr-FR").format(maxPrice)} FCFA
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="150000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#0A3D91] h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Availability */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-gray-400">Disponibilité</h4>
                  <div className="space-y-1.5">
                    {[
                      { label: "Tous les produits", value: "all" },
                      { label: "En Stock uniquement", value: "inStock" },
                      { label: "Rupture de Stock", value: "outOfStock" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setAvailabilityFilter(item.value as any)}
                        className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg font-semibold transition-all ${
                          availabilityFilter === item.value
                            ? "text-[#0A3D91] font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                          availabilityFilter === item.value ? "border-[#0A3D91] bg-[#0A3D91] text-white" : "border-gray-300"
                        }`}>
                          {availabilityFilter === item.value && <Check size={10} className="stroke-[3]" />}
                        </div>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo/New */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-gray-400">Offres & Nouveautés</h4>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setPromoOnly(!promoOnly)}
                      className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-gray-500 font-semibold"
                    >
                      <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                        promoOnly ? "border-[#F7941D] bg-[#F7941D] text-white" : "border-gray-300"
                      }`}>
                        {promoOnly && <Check size={10} />}
                      </div>
                      En promotion uniquement
                    </button>

                    <button
                      onClick={() => setNewOnly(!newOnly)}
                      className="w-full flex items-center gap-2 text-left px-2 py-1.5 rounded-lg text-gray-500 font-semibold"
                    >
                      <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                        newOnly ? "border-[#0A3D91] bg-[#0A3D91] text-white" : "border-gray-300"
                      }`}>
                        {newOnly && <Check size={10} />}
                      </div>
                      Nouveautés uniquement
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-xs text-center hover:bg-gray-100 transition-colors"
                >
                  Effacer tout
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 bg-[#0A3D91] text-white py-3 rounded-xl font-bold text-xs text-center hover:bg-[#F7941D] transition-colors shadow-md"
                >
                  Appliquer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
