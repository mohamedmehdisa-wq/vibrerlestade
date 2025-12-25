import React, { useState } from 'react';
import { Team, Match, SyncSignal, AnimationEvent } from '../types';

interface AdminManagerProps {
  teams: Team[];
  matches: Match[];
  onUpdateTeams: (teams: Team[]) => void;
  onUpdateMatches: (matches: Match[]) => void;
}

const AdminManager: React.FC<AdminManagerProps> = ({ teams, matches, onUpdateTeams, onUpdateMatches }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'setup' | 'calendar'>('live');
  const [targetMatch, setTargetMatch] = useState<Match | null>(matches[0]);

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
  };

  const updateScore = (matchId: string, side: 'home' | 'away', val: number) => {
    const newMatches = matches.map(m => {
       if (m.id === matchId) {
          return side === 'home' ? { ...m, homeScore: val } : { ...m, awayScore: val };
       }
       return m;
    });
    onUpdateMatches(newMatches);
  };

  const homeTeam = teams.find(t => t.id === targetMatch?.homeTeamId);
  const awayTeam = teams.find(t => t.id === targetMatch?.awayTeamId);

  return (
    <div className="min-h-screen text-white p-6 pb-40 animate-fade-in bg-black">
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
        <div>
           <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">CAPO MASTER</h2>
           <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Control Room 2025</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/50 flex items-center justify-center animate-pulse">
           <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_red]"></div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-3xl border border-white/5">
        {['live', 'setup', 'calendar'].map((tab: any) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white/60'}`}
          >
            {tab === 'live' ? '🕹️ Live' : tab === 'setup' ? '🌍 Nations' : '📅 Matchs'}
          </button>
        ))}
      </div>

      {activeTab === 'live' && targetMatch && (
        <div className="space-y-6">
           {/* SELECTION DU MATCH LIVE */}
           <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/10 text-center">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-4 block">Match en cours de pilotage</span>
              <div className="flex justify-around items-center">
                 <div className="text-center">
                    <span className="text-4xl block mb-1">{homeTeam?.flag}</span>
                    <div className="flex items-center gap-2 justify-center">
                      <button onClick={() => updateScore(targetMatch.id, 'home', (targetMatch.homeScore || 0) - 1)} className="w-6 h-6 bg-white/5 rounded-full">-</button>
                      <span className="text-2xl font-black">{targetMatch.homeScore || 0}</span>
                      <button onClick={() => updateScore(targetMatch.id, 'home', (targetMatch.homeScore || 0) + 1)} className="w-6 h-6 bg-white/5 rounded-full">+</button>
                    </div>
                 </div>
                 <span className="text-sm font-black italic opacity-20">VS</span>
                 <div className="text-center">
                    <span className="text-4xl block mb-1">{awayTeam?.flag}</span>
                    <div className="flex items-center gap-2 justify-center">
                      <button onClick={() => updateScore(targetMatch.id, 'away', (targetMatch.awayScore || 0) - 1)} className="w-6 h-6 bg-white/5 rounded-full">-</button>
                      <span className="text-2xl font-black">{targetMatch.awayScore || 0}</span>
                      <button onClick={() => updateScore(targetMatch.id, 'away', (targetMatch.awayScore || 0) + 1)} className="w-6 h-6 bg-white/5 rounded-full">+</button>
                    </div>
                 </div>
              </div>
           </div>

           {/* COMMANDES LIVE */}
           <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-zinc-900 p-6 rounded-[2.5rem] border border-white/10">
                 <h3 className="text-[10px] font-black text-white/40 uppercase mb-4 text-center">Actions Synchronisées</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => sendSignal('SHOUT', 'SIR ! SIR ! SIR !', homeTeam?.id)} className="bg-red-700 p-6 rounded-[2rem] font-black text-[11px] uppercase border-b-4 border-red-900 active:translate-y-1">
                       SIR {homeTeam?.name}
                    </button>
                    <button onClick={() => sendSignal('SILENCE', 'SILENCE TOTAL', awayTeam?.id)} className="bg-zinc-800 p-6 rounded-[2rem] font-black text-[11px] uppercase border-b-4 border-black active:translate-y-1">
                       SILENCE ADVERSE
                    </button>
                    <button onClick={() => sendSignal('ANTHEM', 'HYMNE NATIONAL', homeTeam?.id)} className="bg-blue-600 p-6 rounded-[2rem] font-black text-[11px] uppercase border-b-4 border-blue-900 active:translate-y-1">
                       HYMNE {homeTeam?.name}
                    </button>
                    <button onClick={() => sendSignal('FLASH', 'ORAGE DE FLASHS')} className="bg-white text-black p-6 rounded-[2rem] font-black text-[11px] uppercase border-b-4 border-zinc-400 active:translate-y-1">
                       FLASH STADIUM
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'setup' && (
        <div className="grid gap-3">
           {teams.map(team => (
              <div key={team.id} className="bg-zinc-900 p-5 rounded-[2rem] flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{team.flag}</span>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-sm">{team.name}</h4>
                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{team.nickname}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <div className="text-[9px] font-black text-white/40 uppercase bg-black/40 px-2 py-1 rounded-full">{team.anthemLanguage}</div>
                   <input 
                    type="color" 
                    value={team.primaryColor} 
                    onChange={(e) => updateTeamColor(team.id, e.target.value)}
                    className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer"
                  />
                </div>
              </div>
           ))}
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="space-y-3">
          {matches.map(match => (
            <button key={match.id} onClick={() => setTargetMatch(match)} className={`w-full bg-zinc-900 p-6 rounded-[2.5rem] border text-left transition-all ${targetMatch?.id === match.id ? 'border-gold' : 'border-white/5'}`}>
               <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-white/30 uppercase">{match.date} - {match.time}</span>
                  <span className="text-[9px] font-black text-gold uppercase">{match.group}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xl font-black uppercase tracking-tighter">{teams.find(t => t.id === match.homeTeamId)?.name}</span>
                  <span className="text-xs font-black opacity-20 mx-4">VS</span>
                  <span className="text-xl font-black uppercase tracking-tighter text-right">{teams.find(t => t.id === match.awayTeamId)?.name}</span>
               </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminManager;
