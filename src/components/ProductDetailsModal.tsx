import React, { useState } from "react";
import { X, MessageCircle, Check, AlertTriangle, Calendar, Award, Tag, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Product } from "../types";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price);
  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat("fr-FR").format(product.oldPrice)
    : null;

  const handleWhatsAppOrder = () => {
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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto" id="product-detail-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all hover:scale-105"
        >
          <X size={20} />
        </button>
 
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Section */}
          <div className="p-6 bg-slate-50 flex flex-col gap-4">
            {/* Main active image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-slate-100">
              <img
                src={product.images[activeImageIndex] || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
 
              {/* Badges on main image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isPromo && product.discountPercentage && (
                  <span className="bg-[#F7941D] text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                    -{product.discountPercentage}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-0.5">
                    <Sparkles size={12} /> NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-[#0A3D91] text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                    Vedette
                  </span>
                )}
              </div>
            </div>
 
            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2 scrollbar-thin">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 bg-white shadow-xs transition-all ${
                      activeImageIndex === idx ? "border-[#0A3D91] scale-95" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt={`Aperçu ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>
 
          {/* Right Column: Information Section */}
          <div className="p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Category & Reference */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-b border-slate-100 pb-3">
                <span className="bg-slate-100 px-2.5 py-1 rounded text-[#0A3D91] font-semibold">{product.category}</span>
                <span>Ref: <strong className="text-gray-600">{product.ref}</strong></span>
              </div>
 
              {/* Title */}
              <div className="text-left">
                <h2 className="text-xl font-black text-[#0A3D91] tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed italic">
                  {product.shortDescription}
                </p>
              </div>
 
              {/* Price & Stock */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex flex-col text-left">
                  {formattedOldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formattedOldPrice} FCFA
                    </span>
                  )}
                  <span className="text-2xl font-black text-[#F7941D]">
                    {formattedPrice} <span className="text-sm font-bold">FCFA</span>
                  </span>
                </div>
 
                <div>
                  {product.stock > 0 && product.isAvailable ? (
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
                      <Check size={14} className="stroke-[3]" /> En Stock
                    </span>
                  ) : (
                    <span className="bg-red-50 text-red-800 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
                      <AlertTriangle size={14} className="stroke-[3]" /> Rupture
                    </span>
                  )}
                </div>
              </div>
 
              {/* Product Specifications Table */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Fiche Technique</h4>
                <div className="border border-slate-100 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                  <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                    <span className="text-slate-400 font-medium">Matière</span>
                    <span className="col-span-2 text-slate-800 font-bold">{product.material}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-slate-400 font-medium">Couleur</span>
                    <span className="col-span-2 text-slate-800 font-bold">{product.color}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                    <span className="text-slate-400 font-medium">Dimensions</span>
                    <span className="col-span-2 text-slate-800 font-bold">{product.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <span className="text-slate-400 font-medium">Disponibilité</span>
                    <span className="col-span-2 text-slate-800 font-bold">
                      {product.stock > 0 && product.isAvailable ? "Disponible immédiatement" : "Sur commande"}
                    </span>
                  </div>
                </div>
              </div>
 
              {/* Detailed Description */}
              <div className="space-y-2 text-left">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description détaillée</h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-lg border border-slate-50">
                  {product.detailedDescription || "Aucune description détaillée n'est disponible pour le moment."}
                </p>
              </div>
            </div>
 
            {/* Action Order Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.isAvailable || product.stock <= 0}
                className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-lg font-bold text-sm text-white transition-all duration-300 shadow-sm ${
                  product.isAvailable && product.stock > 0
                    ? "bg-[#25D366] hover:bg-[#1ebd54] active:scale-95 hover:shadow-md"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <MessageCircle size={18} className="stroke-[2.5]" />
                Commander sur WhatsApp
              </button>
              <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
                <Calendar size={12} /> Ajouté le : {new Date(product.dateAdded).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
