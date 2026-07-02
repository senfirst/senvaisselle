import React from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppFloating() {
  const whatsappNumber = "221788626180";
  const defaultMessage = "Bonjour Sen Vaisselle, j'aimerais avoir des renseignements sur vos articles de table et ustensiles.";
  const encodedText = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#1ebd54] transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      id="floating-whatsapp-btn"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <MessageCircle size={20} className="stroke-[2.5]" />
      <span className="font-semibold text-sm tracking-wide hidden md:inline">Contact WhatsApp</span>
    </motion.a>
  );
}
