import React from "react";
import { ArrowRight, ChevronRight, MessageCircle, Star, Sparkles, Flame, Percent, RefreshCw, Truck, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Product, Category } from "../types";
import ProductCard from "../components/ProductCard";

interface HomeProps {
  products: Product[];
  categories: Category[];
  onNavigate: (page: string, params?: any) => void;
  onViewProduct: (product: Product) => void;
}

export default function Home({ products, categories, onNavigate, onViewProduct }: HomeProps) {
  // Get featured products
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  // Get promo products
  const promoProducts = products.filter((p) => p.isPromo).slice(0, 4);

  // Quick categories
  const mainCategories = categories.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="bg-white min-h-screen" id="home-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0A3D91] via-slate-900 to-slate-950 text-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Abstract Placeholder Image Pattern / Geometric grid background from Design HTML */}
        <div className="absolute right-0 top-0 w-2/3 h-full grid grid-cols-4 gap-1 opacity-10 pointer-events-none z-0">
          <div className="bg-slate-700"></div><div className="bg-slate-600"></div><div className="bg-slate-500"></div><div className="bg-slate-800"></div>
          <div className="bg-slate-800"></div><div className="bg-slate-500"></div><div className="bg-slate-700"></div><div className="bg-slate-600"></div>
          <div className="bg-slate-600"></div><div className="bg-slate-700"></div><div className="bg-slate-800"></div><div className="bg-slate-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <span className="inline-flex items-center gap-1.5 bg-[#F7941D] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded">
              <Sparkles size={12} /> Étoffe tes repas • Sénégal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Une Table Élégante, <br />
              <span className="text-[#F7941D]">Une Cuisine Moderne</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Découvrez la plus belle sélection de vaisselle royale, de verres étincelants, de marmites de chef et d'accessoires ménagers à Dakar. Transformez chaque repas en fête.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => onNavigate("shop")}
                className="bg-[#F7941D] text-white hover:bg-white hover:text-[#0A3D91] px-8 py-4 rounded-lg font-bold text-sm tracking-wide shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Visiter la Boutique
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate("categories")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                Parcourir les catégories
              </button>
            </div>

            {/* Quick trust highlights */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/10 text-xs text-slate-300 font-mono">
              <div>
                <p className="text-xl font-black text-[#F7941D] mb-0.5">18+</p>
                <p>Catégories de produits</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#F7941D] mb-0.5">Dakar</p>
                <p>Livraison Rapide</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#F7941D] mb-0.5">100%</p>
                <p>Qualité Garantie</p>
              </div>
            </div>
          </motion.div>

          {/* Hero Graphic / Highlighted Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80"
                alt="Vaisselle Premium Sen Vaisselle"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-left">
                  <span className="bg-[#F7941D] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                    PROMO DE LA SEMAINE
                  </span>
                  <h3 className="text-lg font-black text-white leading-tight">Service d'Assiettes Royale en Porcelaine</h3>
                  <p className="text-xs text-slate-300 font-medium">L'art de la table à la perfection</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100/50">
            <div className="bg-[#0A3D91]/10 p-3 rounded-full text-[#0A3D91]">
              <Truck size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Livraison Express</h4>
              <p className="text-xs text-gray-500">Dakar et régions du Sénégal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100/50">
            <div className="bg-[#F7941D]/10 p-3 rounded-full text-[#F7941D]">
              <MessageCircle size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Commande WhatsApp</h4>
              <p className="text-xs text-gray-500">Un clic pour commander simplement</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100/50">
            <div className="bg-[#0A3D91]/10 p-3 rounded-full text-[#0A3D91]">
              <Star size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Qualité Premium</h4>
              <p className="text-xs text-gray-500">Matériaux rigoureusement choisis</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100/50">
            <div className="bg-[#F7941D]/10 p-3 rounded-full text-[#F7941D]">
              <RefreshCw size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Conseils & Service</h4>
              <p className="text-xs text-gray-500">Assistance client chaleureuse 7J/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Circles Slider */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-[#F7941D] uppercase tracking-widest font-mono">Nos Univers</span>
              <h2 className="text-3xl font-black text-[#0A3D91] tracking-tight">Parcourir par Catégories</h2>
            </div>
            <button
              onClick={() => onNavigate("categories")}
              className="text-[#0A3D91] hover:text-[#F7941D] font-bold text-sm flex items-center gap-1 group transition-colors"
            >
              Voir toutes les catégories
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {mainCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate("shop", { category: cat.name })}
                className="bg-gray-50 rounded-2xl p-4 border border-gray-100 cursor-pointer hover:shadow-lg transition-all group text-center"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 mb-4 shadow-inner relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                </div>
                <h4 className="font-bold text-sm text-slate-800 group-hover:text-[#0A3D91] transition-colors truncate">
                  {cat.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products (Produits vedettes) */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-[#0A3D91] uppercase tracking-widest font-mono flex items-center gap-1">
                <Star size={14} className="fill-[#F7941D] text-[#F7941D]" /> Les Favoris de la Boutique
              </span>
              <h2 className="text-3xl font-black text-[#0A3D91] tracking-tight">Produits Vedettes</h2>
            </div>
            <button
              onClick={() => onNavigate("shop")}
              className="text-[#0A3D91] hover:text-[#F7941D] font-bold text-sm flex items-center gap-1 group transition-colors"
            >
              Explorer toute la boutique
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onViewDetails={onViewProduct} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">Aucun produit vedette disponible.</p>
          )}
        </div>
      </section>

      {/* High impact banner for promotions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A3D91] rounded-2xl overflow-hidden shadow-lg relative text-white p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -left-10 w-96 h-96 rounded-full bg-white blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full bg-[#F7941D] blur-3xl"></div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left relative z-10">
              <span className="inline-flex items-center gap-1 bg-[#F7941D] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded">
                <Percent size={12} /> Bon Plan
              </span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                Équipez Votre Cuisine <br />À Prix Réduit !
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-sans">
                Découvrez nos remises exclusives allant jusqu'à -25% sur nos tasses en grès artisanal, services de vaisselle royale, et casseroles de chef. Les stocks sont limités !
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("promotions")}
                  className="bg-[#F7941D] hover:bg-white hover:text-[#0A3D91] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 group shadow-sm"
                >
                  Voir les promotions
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative z-10">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-white/10 shadow-xl max-w-sm w-full">
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                    alt="Promo de vaisselle"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h5 className="font-bold text-xs text-slate-200">Tasse en Grès Artisanal d'Afrique</h5>
                    <p className="text-[10px] text-slate-400">Ref: SV-003</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-red-400 line-through">6.000 F</span>
                    <p className="text-sm font-black text-[#F7941D]">4.500 F</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals (Nouveautés) */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-[#0A3D91] uppercase tracking-widest font-mono flex items-center gap-1">
                <Flame size={14} className="text-[#F7941D]" /> Les Derniers Ajouts
              </span>
              <h2 className="text-3xl font-black text-[#0A3D91] tracking-tight">Nouveautés</h2>
            </div>
            <button
              onClick={() => onNavigate("new")}
              className="text-[#0A3D91] hover:text-[#F7941D] font-bold text-sm flex items-center gap-1 group transition-colors"
            >
              Voir toutes les nouveautés
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {promoProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {promoProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onViewDetails={onViewProduct} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">Aucun produit récent disponible.</p>
          )}
        </div>
      </section>

      {/* Custom info block about ordering simple flow */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="bg-[#25D366]/10 text-[#25D366] w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <MessageCircle size={30} className="stroke-[2.5]" />
          </div>
          <h2 className="text-3xl font-black text-[#0A3D91] tracking-tight">
            Comment Commander ? C'est ultra simple !
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
            Pas de panier complexe ni de paiements en ligne risqués. Vous trouvez l'article de votre choix, cliquez sur le bouton WhatsApp et votre commande pré-remplie est envoyée directement à notre équipe. Nous vous livrons rapidement !
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <span className="bg-[#0A3D91] text-white font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold mb-4">1</span>
              <h4 className="font-bold text-sm text-gray-900 mb-1">Choisis tes produits</h4>
              <p className="text-xs text-gray-500">Parcours nos magnifiques collections de vaisselle et d'articles de table.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <span className="bg-[#F7941D] text-white font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold mb-4">2</span>
              <h4 className="font-bold text-sm text-gray-900 mb-1">Valide sur WhatsApp</h4>
              <p className="text-xs text-gray-500">Clique sur le bouton vert de commande. Le message pré-rempli se génère automatiquement.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <span className="bg-emerald-500 text-white font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold mb-4">3</span>
              <h4 className="font-bold text-sm text-gray-900 mb-1">Fais-toi livrer !</h4>
              <p className="text-xs text-gray-500">Notre équipe confirme la disponibilité en quelques minutes et planifie ta livraison.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
