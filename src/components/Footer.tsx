import React from "react";
import { Mail, Phone, MapPin, ShoppingBag, ArrowUpRight, Shield } from "lucide-react";
import { ShopInfo } from "../types";

interface FooterProps {
  onNavigate: (page: string) => void;
  shopInfo: ShopInfo;
}

export default function Footer({ onNavigate, shopInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="bg-[#F7941D] p-2 rounded-lg">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              SEN<span className="text-[#F7941D]">VAISSELLE</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            {shopInfo.aboutText.substring(0, 150)}...
          </p>
          <div className="flex gap-3 pt-2">
            <span className="text-xs font-mono px-2 py-1 bg-slate-900 text-slate-400 rounded border border-slate-800">
              Dakar, Sénégal
            </span>
            <span className="text-xs font-mono px-2 py-1 bg-slate-900 text-slate-400 rounded border border-slate-800">
              100% Client-Side
            </span>
          </div>
        </div>

        {/* Links column */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 tracking-wide uppercase">Navigation</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {[
              { label: "Accueil", value: "home" },
              { label: "Boutique", value: "shop" },
              { label: "Catégories", value: "categories" },
              { label: "Promotions", value: "promotions" },
              { label: "Nouveautés", value: "new" },
              { label: "À propos de nous", value: "about" },
              { label: "Contactez-nous", value: "contact" },
            ].map((link) => (
              <li key={link.value}>
                <button
                  onClick={() => onNavigate(link.value)}
                  className="hover:text-[#F7941D] flex items-center gap-1 group transition-colors text-left"
                >
                  <ArrowUpRight size={14} className="text-slate-600 group-hover:text-[#F7941D] transition-colors" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info column */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 tracking-wide uppercase">Contact Direct</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Téléphone</p>
                <a href={`tel:${shopInfo.phone}`} className="text-slate-300 hover:text-white transition-colors">
                  {shopInfo.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp</p>
                <a
                  href={`https://wa.me/${shopInfo.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors font-medium"
                >
                  {shopInfo.whatsapp}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail</p>
                <a href={`mailto:${shopInfo.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {shopInfo.email}
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Store Location */}
        <div>
          <h4 className="text-base font-bold text-white mb-5 tracking-wide uppercase">Boutique physique</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#F7941D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Adresse</p>
                <p className="text-slate-300 leading-relaxed">{shopInfo.address}</p>
              </div>
            </li>
            <li className="pt-2">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
                <Shield size={16} className="text-blue-400 shrink-0" />
                <span className="text-xs text-slate-400 leading-relaxed">
                  Connexion sécurisée pour l'administrateur de la boutique.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 text-center md:text-left">
          © {currentYear} <strong>Sen Vaisselle</strong>. Tous droits réservés.
        </p>
        <div className="flex gap-4 text-xs text-slate-500">
          <button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">
            À propos
          </button>
          <span>•</span>
          <button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors">
            Contact & Localisation
          </button>
          <span>•</span>
          <button onClick={() => onNavigate("admin-login")} className="hover:text-white transition-colors flex items-center gap-1">
            Connexion Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
