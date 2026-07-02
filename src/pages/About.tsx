import React from "react";
import { Sparkles, ShoppingBag, Award, Heart, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { ShopInfo } from "../types";

interface AboutProps {
  shopInfo: ShopInfo;
  onNavigate: (page: string) => void;
}

export default function About({ shopInfo, onNavigate }: AboutProps) {
  return (
    <div className="bg-white min-h-screen py-12" id="about-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-[#F7941D] uppercase tracking-widest font-mono">Qui Sommes-Nous ?</span>
          <h1 className="text-3xl font-black text-[#0A3D91] tracking-tight mt-1">À Propos de Sen Vaisselle</h1>
          <p className="text-xs text-gray-500 mt-2">
            Notre passion est de sublimer vos tables et simplifier vos préparations culinaires au Sénégal.
          </p>
        </div>

        {/* Intro Block with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 text-left"
          >
            <h2 className="text-2xl font-black text-[#0A3D91] tracking-tight leading-tight">
              Une histoire d'excellence au service de la maison sénégalaise
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {shopInfo.aboutText}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Depuis notre création, nous nous efforçons d'offrir le meilleur rapport qualité-prix du marché. Que vous cherchiez un service complet en porcelaine pour accueillir vos invités, des poêles antiadhésives robustes pour concocter vos spécialités sénégalaises, ou de la décoration florale de table pour sublimer votre salle à manger, nous avons ce qu'il vous faut.
            </p>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => onNavigate("shop")}
                className="bg-[#0A3D91] text-white hover:bg-[#F7941D] px-6 py-3 rounded-xl font-bold text-xs transition-colors shadow-md"
              >
                Découvrir nos produits
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="border border-[#0A3D91] text-[#0A3D91] hover:bg-gray-50 px-6 py-3 rounded-xl font-bold text-xs transition-colors"
              >
                Nous Contacter
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=800&q=80"
                alt="Table dressée Sen Vaisselle"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#F7941D] text-white p-5 rounded-2xl shadow-xl max-w-xs text-left hidden sm:block">
              <h4 className="font-black text-sm mb-1">Qualité & Durabilité</h4>
              <p className="text-[11px] text-orange-100 leading-relaxed">
                Tous nos articles ménagers et vaisselles sont testés pour résister à un usage quotidien intense.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our values */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0A3D91] uppercase tracking-wider font-mono">Ce qui nous anime</span>
            <h3 className="text-2xl font-black text-[#0A3D91] tracking-tight mt-1">Nos Valeurs Clés</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100/60 space-y-3">
              <div className="bg-[#0A3D91]/10 text-[#0A3D91] w-10 h-10 rounded-full flex items-center justify-center font-bold">
                <Award size={20} />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Sélection d'Exception</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nous parcourons les meilleures manufactures internationales pour dénicher des pièces uniques, alliant finesse esthétique et résistance physique supérieure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100/60 space-y-3">
              <div className="bg-[#F7941D]/10 text-[#F7941D] w-10 h-10 rounded-full flex items-center justify-center font-bold">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Rapport Qualité-Prix</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nous croyons que l'élégance de table ne doit pas être un luxe inatteignable. Nous optimisons nos coûts pour vous garantir les meilleurs tarifs à Dakar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100/60 space-y-3">
              <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                <Heart size={20} />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Service Client d'Élite</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pas de robots froids chez nous. Nos conseillers WhatsApp vous accompagnent avec réactivité, vous envoient de vraies photos et gèrent vos commandes aux petits oignons.
              </p>
            </div>
          </div>
        </div>

        {/* Custom section with WhatsApp Banner */}
        <div className="bg-[#0A3D91] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h3 className="text-2xl font-black">Besoin d'un conseil personnalisé ?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Vous hésitez sur le choix de votre service d'assiettes ? Vous souhaitez des dimensions spécifiques pour une marmite ? Discutez en direct avec nos experts.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${shopInfo.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd54] text-white px-8 py-3.5 rounded-xl font-bold text-xs inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-950/20"
              >
                <MessageCircle size={16} className="stroke-[2.5]" />
                Nous écrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
