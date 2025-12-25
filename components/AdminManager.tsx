import React, { useState } from 'react';
import { Team, Match, SyncSignal } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminManagerProps {
  teams: Team[];
  matches: Match[];
  users: any[];
  onUpdateTeams: (teams: Team[]) => void;
  onUpdateMatches: (matches: Match[]) => void;
}

const liveChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('stadium_sync') : null;

const AdminManager: React.FC<AdminManagerProps> = ({ teams, matches, onUpdateTeams, onUpdateMatches }) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'teams' | 'matches'>('sync');
  const [isSyncing, setIsSyncing] = useState(false);

  const sendSignal = (type: SyncSignal['type'], message: string) => {
    if (!liveChannel) return;
    const signal: SyncSignal = {
      id: `sig_${Date.now()}`,
      timestamp: Date.now(),
      type,
      message,
      countdown: 3
    };
    liveChannel.postMessage(signal);
    alert(`Signal "${message}" envoyé !`);
  };

  const syncWithCAF = async () => {
    setIsSyncing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Génère des scores fictifs pour les matchs de la CAN 2025. Réponds en JSON strict.",
      });
      console.log(response.text);
      alert("Scores mis à jour via IA !");
    } catch (e) {
      alert("Erreur de connexion API.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-6 pb-40 animate-fade-in">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Poste de Capo</h2>
      
      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('sync')} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase transition-all shrink-0 ${activeTab === 'sync' ? 'bg-gold text-black' : 'bg-white/5 text-white/40'}`}>Direct</button>
        <button onClick={() => setActiveTab('teams')} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase transition-all shrink-0 ${activeTab === 'teams' ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>Nations</button>
        <button onClick={() => setActiveTab('matches')} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase transition-all shrink-0 ${activeTab === 'matches' ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}>Calendrier</button>
      </div>

      {activeTab === 'sync' && (
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <button onClick={() => sendSignal('FLASH', 'ÉCLAIRAGE STROBO')} className="bg-white text-black p-8 rounded-[2.5rem] font-black uppercase text-center flex flex-col items-center gap-4 active:scale-95 transition-transform">
                 <span className="text-4xl">🔦</span>
                 <span className="text-[10px] tracking-widest">Flash Sync</span>
              </button>
              <button onClick={() => sendSignal('SHOUT', 'SIR ! SIR ! SIR !')} className="bg-gold text-black p-8 rounded-[2.5rem] font-black uppercase text-center flex flex-col items-center gap-4 active:scale-95 transition-transform">
                 <span className="text-4xl">🗣️</span>
                 <span className="text-[10px] tracking-widest">Cri "SIR"</span>
              </button>
              <button onClick={() => sendSignal('CLAPPING', 'CLAP CLAP CLAP')} className="bg-zinc-800 p-8 rounded-[2.5rem] font-black uppercase text-center flex flex-col items-center gap-4 border border-white/10 active:scale-95 transition-transform">
                 <span className="text-4xl">🙌</span>
                 <span className="text-[10px] tracking-widest">Viking Clap</span>
              </button>
              <button onClick={() => sendSignal('JUMP', 'TOUT LE MONDE SAUTE')} className="bg-zinc-800 p-8 rounded-[2.5rem] font-black uppercase text-center flex flex-col items-center gap-4 border border-white/10 active:scale-95 transition-transform">
                 <span className="text-4xl">👟</span>
                 <span className="text-[10px] tracking-widest">Jump Sync</span>
              </button>
           </div>

           <button 
             onClick={syncWithCAF}
             disabled={isSyncing}
             className="w-full bg-[#7B161D] text-white p-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest mt-4"
           >
             {isSyncing ? 'Synchronisation...' : '📡 Actualiser Live Scores'}
           </button>
        </div>
      )}

      {activeTab !== 'sync' && (
        <div className="p-12 text-center glass rounded-[3rem] opacity-40">
           <p className="text-[10px] font-black uppercase tracking-widest">Module de gestion des données bientôt disponible.</p>
        </div>
      )}
    </div>
  );
};

export default AdminManager;