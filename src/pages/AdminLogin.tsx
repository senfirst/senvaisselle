import React, { useState } from "react";
import { Shield, Mail, Lock, LogIn, AlertTriangle, Check, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onNavigate: (page: string) => void;
}

export default function AdminLogin({ onLoginSuccess, onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // Validate requested admin credentials
      if (email.trim() === "admin@senvaisselle.com" && password === "2004") {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setLoading(false);
        setError("Identifiants incorrects. Veuillez vérifier l'e-mail et le mot de passe administrateur.");
      }
    }, 8000); // 800ms simulation
  };

  return (
    <div className="bg-gray-50 min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8" id="admin-login-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 space-y-6 text-left relative overflow-hidden"
      >
        {/* Decorative corner block */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#0A3D91]/10 to-transparent rounded-bl-full"></div>

        {/* Header / Logo */}
        <div className="space-y-2">
          <div className="bg-[#0A3D91]/10 text-[#0A3D91] w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
            <Shield size={24} className="stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-[#0A3D91] tracking-tight">Espace Administrateur</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            Authentifiez-vous pour gérer les produits, les catégories, les promotions et les stocks de la boutique.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Adresse E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@senvaisselle.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-mono">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-[#0A3D91] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-800 p-3.5 rounded-xl text-xs flex items-start gap-2.5"
            >
              <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-xl text-xs flex items-center gap-2.5"
            >
              <div className="bg-emerald-500 text-white p-0.5 rounded-full">
                <Check size={12} className="stroke-[3]" />
              </div>
              <span className="font-bold">Connexion réussie ! Chargement du tableau de bord...</span>
            </motion.div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold text-white transition-all duration-300 shadow-md ${
                loading || success
                  ? "bg-[#0A3D91]/50 cursor-not-allowed shadow-none"
                  : "bg-[#0A3D91] hover:bg-[#F7941D] active:scale-95 shadow-blue-100"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authentification en cours...
                </span>
              ) : (
                <>
                  <LogIn size={14} /> Se Connecter
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all"
            >
              <ArrowLeft size={14} /> Retour à l'accueil
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="border-t border-gray-100 pt-4 text-[10px] text-gray-400 text-center">
          <p>Compte de démonstration pré-configuré :</p>
          <p className="font-mono mt-1 text-slate-500">
            Email: <strong>admin@senvaisselle.com</strong> • MDP: <strong>2004</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
