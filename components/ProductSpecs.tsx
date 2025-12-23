
import React from 'react';
import { APP_MODULES } from '../constants';

const ProductSpecs: React.FC = () => {
  return (
    <div className="p-6 pb-32 overflow-y-auto max-h-screen no-scrollbar">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Dossier Expert</h2>
      <p className="text-slate-400 mb-8 font-medium">Vibrer le Stade : La révolution du supporterisme.</p>

      {/* SECTION 1: SCRIPT VIDÉO */}
      <section className="mb-10 bg-black text-white p-6 rounded-[2.5rem] shadow-xl border border-white/10">
        <h3 className="text-xs font-black text-gold uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          Script Vidéo (30s Pitch)
        </h3>
        <div className="space-y-3 italic text-sm leading-relaxed opacity-90">
          <p><span className="text-yellow-400 font-bold">0-5s :</span> Un stade plein, un silence de mort. Un gros plan sur un supporter qui ouvre l'app.</p>
          <p><span className="text-yellow-400 font-bold">5-15s :</span> Flash ! Vibration ! 70 000 téléphones s'allument en même temps. Le stade rugit : "SIR ! SIR ! SIR !"</p>
          <p><span className="text-yellow-400 font-bold">15-25s :</span> Montage rapide : Synchronisation parfaite, chants karaoké, visages illuminés par les flashs.</p>
          <p><span className="text-yellow-400 font-bold">25-30s :</span> Logo "Vibrer le Stade". Slogan : "Ne regardez plus le match. Devenez le match."</p>
        </div>
      </section>

      {/* SECTION 2: USER JOURNEY */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-[#7B161D] uppercase mb-4 tracking-widest">User Journey</h3>
        <div className="space-y-4">
          {[
            { step: "1. Installation", desc: "Le fan scanne un QR code sur son billet ou l'écran géant. L'app s'installe en 2s (PWA)." },
            { step: "2. Allégeance", desc: "Choix de l'équipe nationale. L'interface change de couleur instantanément." },
            { step: "3. Synchronisation", desc: "Le téléphone vibre à l'entrée des joueurs. Le fan reçoit le signal du 'Capo' de sa tribune." },
            { step: "4. Explosion", desc: "But ! Le flash de 50 000 fans s'active à la milliseconde près, créant un show lumineux sans précédent." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-black text-xs">{i+1}</div>
              <div>
                <h4 className="font-bold text-sm uppercase">{item.step}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TECH SPECS */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-blue-600 uppercase mb-4 tracking-widest italic">Solution Technique</h3>
        <div className="space-y-4">
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-[#2D2D2D] text-sm mb-1 uppercase tracking-tight">Cœur de Synchro (CODE: PULSE)</h4>
                <p className="text-xs text-slate-500">Utilisation du protocole NTP pour aligner les horloges locales. Déclenchement par Websocket binaire (latence &lt; 50ms).</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-black text-[#2D2D2D] text-sm mb-1 uppercase tracking-tight">Mode Saturation (CODE: OFFLINE)</h4>
                <p className="text-xs text-slate-500">Service Worker agressif. Toutes les paroles et audios sont en cache. Zéro téléchargement requis pendant le match.</p>
            </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-green-600 uppercase mb-4 tracking-widest italic">Monétisation & Partenariats</h3>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-[2.5rem] border border-green-100">
            <ul className="space-y-4 text-xs font-bold text-green-800">
                <li className="flex items-start gap-3">
                  <span className="text-lg">💰</span>
                  <span><b>Sponsoring Émotionnel :</b> "L'instant Flash Orange" ou "La Vibration MTN". Les sponsors paient pour déclencher des moments de joie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🤝</span>
                  <span><b>Data Supporters :</b> Statistiques d'engagement en temps réel pour la CAF et les marques.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg">🎟️</span>
                  <span><b>Upselling :</b> Accès à des chants exclusifs ou badges numériques NFT pour les supporters premium.</span>
                </li>
            </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductSpecs;
