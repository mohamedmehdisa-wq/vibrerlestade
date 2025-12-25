import React, { useState } from 'react';
import { Team, Match, SyncSignal, AnimationEvent } from '../types';

interface AdminManagerProps {
  teams: Team[];
  matches: Match[];
  onUpdateTeams: (teams: Team[]) => void;
  onUpdateMatches: (matches: Match[]) => void;
}

const AdminManager: React.FC<AdminManagerProps> = ({ teams, matches, onUpdateTeams, onUpdateMatches }) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'teams' | 'matches'>('sync');
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const liveChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('stadium_sync') : null;

  const sendSignal = (type: SyncSignal['type'], message: string, targetTeamId?: string) => {
    if (!liveChannel) return;
    const signal: SyncSignal = {
      id: `sig_${Date.now()}`,
      timestamp: Date.now(),
      type,
      message,
      countdown: 3,
      targetTeamId
    };
    liveChannel.postMessage(signal);
  };

  const updateTeamColor = (id: string, color: string) => {
    const newTeams = teams.map(t => t.id === id ? { ...t, primaryColor: color } : t);
    onUpdateTeams(newTeams);
    localStorage.setItem('vibrer_stade_teams', JSON.stringify(newTeams));
  };

  return (
    <div className="min-h-screen text-white p-6 pb-40 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Capo Command</h2>
        <div className="px-3 py-1 bg-red-600 rounded-full text-[8px] font-black animate-pulse">ADMIN ACCESS</div>
      </div>
      
      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar">
        {['sync', 'teams', 'matches'].map((tab: any) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase transition-all shrink-0 ${activeTab === tab ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}
          >
            {tab === 'sync' ? '🕹️ Live Sync' : tab === 'teams' ? '🌍 Nations' : '📅 Calendrier'}
          </button>
        ))}
      </div>

      {activeTab === 'sync' && (
        <div className="space-y-8">
           <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4 text-center">Contrôle Orchestré</h3>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => sendSignal('SHOUT', 'SIR ! SIR ! SIR !', 'morocco')} className="bg-[#7B161D] p-6 rounded-[2rem] font-black text-[10px] uppercase">
                    SIR MOROCCO
                 </button>
                 <button onClick={() => sendSignal('SILENCE', 'SILENCE TOTAL', 'comoros')} className="bg-zinc-800 p-6 rounded-[2rem] font-black text-[10px] uppercase">
                    SILENCE ADVERSE
                 </button>
                 <button onClick={() => sendSignal('ANTHEM', 'LANCER HYMNE', 'morocco')} className="bg-blue-600 p-6 rounded-[2rem] font-black text-[10px] uppercase">
                    HYMNE ARABE
                 </button>
                 <button onClick={() => sendSignal('FLASH', 'ORAGE DE FLASHS')} className="bg-white text-black p-6 rounded-[2rem] font-black text-[10px] uppercase">
                    TOUT LE STADE
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="grid gap-4">
           {teams.map(team => (
              <div key={team.id} className="bg-zinc-900 p-6 rounded-[2.5rem] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{team.flag}</span>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-sm">{team.name}</h4>
                    <span className="text-[8px] font-bold text-white/40">{team.nickname}</span>
                  </div>
                </div>
                <input 
                  type="color" 
                  value={team.primaryColor} 
                  onChange={(e) => updateTeamColor(team.id, e.target.value)}
                  className="w-10 h-10 rounded-full overflow-hidden border-none bg-transparent cursor-pointer"
                />
              </div>
           ))}
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.id} className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5">
               <div className="flex justify-between items-center mb-4 opacity-40">
                  <span className="text-[9px] font-black uppercase">{match.fullDate}</span>
                  <span className="text-[9px] font-black">{match.time}</span>
               </div>
               <div className="flex justify-around items-center">
                  <span className="text-2xl">{teams.find(t => t.id === match.homeTeamId)?.flag}</span>
                  <div className="flex gap-2">
                    <input className="w-8 bg-black border border-white/10 text-center font-black rounded" placeholder="0" />
                    <span className="font-black opacity-20">-</span>
                    <input className="w-8 bg-black border border-white/10 text-center font-black rounded" placeholder="0" />
                  </div>
                  <span className="text-2xl">{teams.find(t => t.id === match.awayTeamId)?.flag}</span>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManager;
