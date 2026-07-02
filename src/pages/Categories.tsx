import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { Category, Product } from "../types";

interface CategoriesProps {
  categories: Category[];
  products: Product[];
  onNavigate: (page: string, params?: any) => void;
}

export default function Categories({ categories, products, onNavigate }: CategoriesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="bg-white min-h-screen py-12" id="categories-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-[#F7941D] uppercase tracking-widest font-mono">Nos Rayons</span>
          <h1 className="text-3xl font-black text-[#0A3D91] tracking-tight mt-1">Toutes les Catégories</h1>
          <p className="text-xs text-gray-500 mt-2">
            Découvrez nos 18 univers dédiés à l'art de la table, la cuisine et la maison au Sénégal.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((cat) => {
            const productCount = products.filter(
              (p) => p.category.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate("shop", { category: cat.name })}
                className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-slate-200">
                  <img
                    src={cat.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
 
                  {/* Products Counter Badge */}
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="bg-[#F7941D] text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-md">
                      {productCount} {productCount > 1 ? "produits" : "produit"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-[#0A3D91] group-hover:text-[#F7941D] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {cat.description || `Découvrez tous les articles de notre univers ${cat.name}.`}
                    </p>
                  </div>

                  {/* Explore Link */}
                  <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-[#0A3D91] group-hover:text-[#F7941D] transition-colors mt-auto">
                    Explorer le rayon
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
