import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, Clock } from "lucide-react";
import { motion } from "motion/react";
import { ShopInfo } from "../types";

interface ContactProps {
  shopInfo: ShopInfo;
}

export default function Contact({ shopInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen py-12" id="contact-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12">
          <span className="text-xs font-bold text-[#F7941D] uppercase tracking-widest font-mono">Discutons Ensemble</span>
          <h1 className="text-3xl font-black text-[#0A3D91] tracking-tight mt-1">Contact & Localisation</h1>
          <p className="text-xs text-gray-500 mt-2">
            Notre showroom à Dakar vous accueille. Contactez-nous ou passez nous voir directement !
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-[#0A3D91] text-white p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl font-black">Informations de Contact</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Notre équipe est disponible du Lundi au Samedi de 8h30 à 19h00 pour répondre à toutes vos interrogations.
                </p>
              </div>

              <div className="relative z-10 space-y-4 pt-4 border-t border-white/10 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-[#F7941D] mt-1 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Téléphone Fixe</p>
                    <a href={`tel:${shopInfo.phone}`} className="hover:text-[#F7941D] transition-colors font-medium">
                      {shopInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-emerald-400 mt-1 shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">WhatsApp Direct</p>
                    <a
                      href={`https://wa.me/${shopInfo.whatsapp.replace(/\+/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors font-medium"
                    >
                      {shopInfo.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-[#F7941D] mt-1 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Adresse E-mail</p>
                    <a href={`mailto:${shopInfo.email}`} className="hover:text-[#F7941D] transition-colors font-medium">
                      {shopInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-[#F7941D] mt-1 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Adresse Physique</p>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {shopInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Showroom Opening hours */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex gap-3 items-center text-xs text-slate-300">
                <Clock size={16} className="text-[#F7941D]" />
                <p>
                  <strong>Heures d'ouverture :</strong> Lun-Sam (08h30 - 19h00)
                </p>
              </div>
            </div>

            {/* Quick Map placeholder / styling representation */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-3xl space-y-3">
              <h4 className="font-bold text-xs text-[#0A3D91] uppercase tracking-wider flex items-center gap-1">
                <MapPin size={14} /> Notre Showroom à Dakar
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Situé sur la célèbre Avenue Cheikh Anta Diop, notre showroom est facilement accessible en transport ou en voiture. Des places de parking gratuites sont à votre disposition.
              </p>

              {/* Google Maps embed code, styled cleanly inside container */}
              <div className="w-full h-44 rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100">
                <iframe
                  title="Sen Vaisselle Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.3486334543163!2d-17.4646738!3d14.6934336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172df8df178bb%3A0xe95e4e8971eb05bd!2sCheikh%20Anta%20Diop%20Ave%2C%20Dakar!5e0!3m2!1sen!2ssn!4v1688000000000!5m2!1sen!2ssn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-100 p-8 rounded-3xl text-left shadow-xs">
            <div className="mb-6">
              <h3 className="text-xl font-black text-[#0A3D91] tracking-tight">Formulaire de Contact</h3>
              <p className="text-xs text-gray-500 mt-1">
                Remplissez ce formulaire et notre service client vous recontactera sous 24h ouvrées.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Nom Complet</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: Fatou Diop"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Adresse E-mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ex: fatou@gmail.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ex: +221 77 000 00 00"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Sujet</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ex: Demande de tarif de gros"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Votre Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message ici..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91] resize-none"
                ></textarea>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-3"
                >
                  <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <p className="font-bold flex items-center gap-1">
                      <Sparkles size={12} className="text-[#F7941D]" /> Message envoyé avec succès !
                    </p>
                    <p className="text-[11px] text-emerald-600 mt-0.5">
                      Merci pour votre message. Un conseiller de Sen Vaisselle vous répondra par e-mail ou par téléphone très rapidement.
                    </p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-[#0A3D91] hover:bg-[#F7941D] text-white py-3.5 px-6 rounded-xl font-bold text-xs transition-colors duration-300 flex items-center justify-center gap-2 shadow-md shadow-blue-900/10"
              >
                <Send size={14} /> Envoyer mon message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
