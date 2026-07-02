import React, { useState } from "react";
import { MessageCircle, Check, AlertTriangle, Eye, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  key?: React.Key;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price);
  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat("fr-FR").format(product.oldPrice)
    : null;

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const whatsappNumber = "221788626180";
    const textMessage = `Bonjour Sen Vaisselle,

Je souhaite commander le produit suivant :

Nom : ${product.name}
Référence : ${product.ref}
Prix : ${formattedPrice} FCFA

Merci de me confirmer sa disponibilité.`;

    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images.length > 1) {
      setCurrentImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md overflow-hidden flex flex-col h-full group cursor-pointer"
      onClick={() => onViewDetails(product)}
      id={`product-card-${product.id}`}
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.images[currentImgIndex] || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isPromo && product.discountPercentage && (
            <span className="bg-[#F7941D] text-white text-[9px] font-black px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs flex items-center gap-0.5">
              <Sparkles size={9} /> NEW
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-[#0A3D91] text-white text-[9px] font-black px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-xs">
              Vedette
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          {product.stock > 0 && product.isAvailable ? (
            <span className="bg-white/95 backdrop-blur-xs text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 shadow-xs flex items-center gap-1">
              <Check size={10} className="stroke-[3]" /> En Stock ({product.stock})
            </span>
          ) : (
            <span className="bg-red-50/95 backdrop-blur-xs text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-100 shadow-xs flex items-center gap-1">
              <AlertTriangle size={10} className="stroke-[3]" /> Rupture
            </span>
          )}
        </div>

        {/* Image Navigation Arrows */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevImage}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm backdrop-blur-xs transition-colors"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={nextImage}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-sm backdrop-blur-xs transition-colors"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 bg-[#0A3D91]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-[#0A3D91] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md flex items-center gap-1 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <Eye size={12} /> Aperçu rapide
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 flex flex-col flex-1 text-left">
        {/* Category & Reference */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold mb-1">
          <span>{product.category}</span>
          <span className="font-mono text-[9px] text-slate-400 font-normal lowercase tracking-normal">Ref: {product.ref}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs font-bold text-[#0A3D91] h-10 overflow-hidden line-clamp-2 group-hover:text-[#F7941D] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Dimensions & Material Small Highlights */}
        <div className="mt-2 pt-2 border-t border-slate-50 flex flex-wrap gap-1 text-[9px] text-slate-400">
          <span className="bg-slate-50 px-1.5 py-0.5 rounded font-medium">{product.material}</span>
          <span className="bg-slate-50 px-1.5 py-0.5 rounded font-medium">{product.color}</span>
        </div>

        {/* Pricing Area */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-bold text-[#F7941D]">
            {formattedPrice} FCFA
          </span>
          {formattedOldPrice && (
            <span className="text-[10px] text-slate-400 line-through">
              {formattedOldPrice} FCFA
            </span>
          )}
        </div>

        {/* Order CTA */}
        <button
          onClick={handleWhatsAppOrder}
          disabled={!product.isAvailable || product.stock <= 0}
          className={`w-full mt-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold uppercase transition-transform active:scale-95 text-white ${
            product.isAvailable && product.stock > 0
              ? "bg-[#25D366] hover:bg-[#1ebd54] shadow-xs"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          <MessageCircle size={14} className="stroke-[2.5]" />
          Commander sur WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
