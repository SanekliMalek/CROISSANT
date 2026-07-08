'use client';

import { FormEvent } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginPanelProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  authError: string | null;
  authLoading: boolean;
  handleLogin: (e: FormEvent) => void;
}

export default function AdminLoginPanel({
  username,
  setUsername,
  password,
  setPassword,
  authError,
  authLoading,
  handleLogin,
}: AdminLoginPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-screen bg-[#0c0a09] text-stone-100 flex items-center justify-center p-6 relative overflow-hidden"
    >
      <div className="absolute w-[450px] h-[450px] rounded-full bg-red-950/20 filter blur-3xl z-0 pointer-events-none" />

      <div className="w-full max-w-md glass-dark p-8 rounded-3xl border border-stone-800/80 shadow-2xl relative z-10 flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/10">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              ESPACE DIRECTOIRE GAFSA
            </h2>
            <p className="text-stone-400 text-xs font-mono tracking-wider uppercase mt-1">
              Portail d'Administration Sécurisé
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold font-mono text-stone-400 uppercase">Utilisateur</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs focus:outline-none focus:border-red-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold font-mono text-stone-400 uppercase">Mot de Passe</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="croissantrouge"
                className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-xs focus:outline-none focus:border-red-500"
                required
              />
            </div>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-red-400 text-[11px] font-mono leading-relaxed">
              ✕ {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold font-mono text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-red-500/10 cursor-pointer"
          >
            {authLoading ? 'Chiffrement de la session...' : 'Connexion Sécurisée'}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-900/60 text-center text-[10px] font-mono text-stone-500">
          Utilisez <span className="text-red-500">admin</span> / <span className="text-red-500">croissantrouge</span> ou <span className="text-red-500">admin</span>
        </div>
      </div>
    </motion.div>
  );
}
