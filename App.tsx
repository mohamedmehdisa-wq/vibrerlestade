import React, { useState, useEffect } from 'react';
import { AppSection, Team, Match, SyncSignal, User } from './types';
import { TEAMS as INITIAL_TEAMS, MATCHES as INITIAL_MATCHES } from './constants';
import Layout from './components/Layout';
import LiveConductor from './components/LiveConductor';
import SongLibrary from './components/SongLibrary';
import AdminManager from './components/AdminManager';
import ProductSpecs from './components/ProductSpecs';

// Le canal de diffusion pour la synchronisation locale entre onglets (si besoin)
const liveChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('stadium_sync') : null;

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Équipes et Matchs
  const [teams, setTeams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem('vibrer_stade_teams');
      return saved ? JSON.parse(saved) : INITIAL_TEAMS;
    } catch (e) { return INITIAL_TEAMS; }
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    try {
      const saved = localStorage.getItem('vibrer_stade_matches');
      return saved ? JSON.parse(saved) : INITIAL_MATCHES;
    } catch (e) { return INITIAL_MATCHES; }
  });

  // Utilisateur et Sélection
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('vibrer_stade_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  const [loginEmail, setLoginEmail] = useState('');
  
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(() => {
    try {
      const saved = localStorage.getItem('vibrer_stade_selected_team');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  const [currentLiveSignal, setCurrentLiveSignal] = useState<SyncSignal | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (liveChannel) {
      liveChannel.onmessage = (event) => {
        const signal: SyncSignal = event.data;
        setCurrentLiveSignal(signal);
        // On ne force le mode LIVE que si l'utilisateur n'est pas déjà en train d'administrer
        if (section !== AppSection.ADMIN && selectedTeam) {
          setSection(AppSection.LIVE);
        }
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [section, selectedTeam]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) return;
    const newUser: User = { email: loginEmail, joinedAt: Date.now() };
    setCurrentUser(newUser);
    localStorage.setItem('vibrer_stade_session', JSON.stringify(newUser));
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    localStorage.setItem('vibrer_stade_selected_team', JSON.stringify(team));
    setSection(AppSection.HOME);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B161D]/40 to-black pointer-events-none" />
        <div className="relative z-10 w-full max-w-sm text-center animate-fade-in">
           <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">VIBRER<br/>LE STADE</h1>
           <p className="text-gold font-black text-[11px] uppercase tracking-[0.5em] mb-16 opacity-70">CAN 2025 OFFICIAL FAN SYNC</p>
           <form onSubmit={handleLogin} className="space-y-5">
              <input 
                type="email" 
                required 
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="EMAIL DU SUPPORTER"
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-center font-bold outline-none focus:border-gold transition-all"
              />
              <button type="submit" className="w-full bg-white text-black p-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-transform">Rejoindre la tribune</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <Layout activeSection={section} onNavigate={setSection}>
      <div className="fixed top-6 right-6 z-[180] flex items-center gap-2 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
        <span className="text-[9px] font-black uppercase text-white/50">{isOnline ? 'Direct' : 'Offline'}</span>
      </div>

      {section === AppSection.HOME && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className="w-full pt-20 pb-28 px-8 text-center rounded-b-[4rem] relative overflow-hidden" 
               style={{ background: selectedTeam ? `linear-gradient(135deg, ${selectedTeam.primaryColor} 0%, #000 100%)` : '#7B161D' }}>
            <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none drop-shadow-2xl">VIBRER<br/>LE STADE</h1>
            <div className="bg-white/10 p-5 rounded-[2.5rem] backdrop-blur-3xl flex justify-between items-center border border-white/10">
              <div className="text-left pl-2">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest block mb-1">Tribune active</span>
                <span className="text-white font-black text-xl tracking-tight">{selectedTeam ? `${selectedTeam.flag} ${selectedTeam.name}` : 'SÉLECTIONNER'}</span>
              </div>
              <button onClick={() => setSection(AppSection.HUB)} className="bg-white text-black px-6 py-3 rounded-full text-[9px] font-black uppercase shadow-lg">Changer</button>
            </div>
          </div>

          <div className="w-full px-8 -mt-16 z-20 space-y-6">
             <button onClick={() => setSection(AppSection.LIVE)} 
                     className="w-full bg-white text-black p-12 rounded-[4rem] shadow-2xl flex flex-col items-center gap-4 transition-all active:scale-95 border-[10px]"
                     style={{ borderColor: selectedTeam?.primaryColor || '#7B161D' }}>
                <span className="text-7xl animate-bounce">🏟️</span>
                <span className="text-3xl font-black uppercase italic tracking-tighter leading-none">MODE STADE LIVE</span>
             </button>
             
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setSection(AppSection.PREP)} className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-all">
                   <span className="text-3xl">🎵</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Bibliothèque</span>
                </button>
                <button onClick={() => setSection(AppSection.MATCHES)} className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 flex flex-col items-center gap-3 active:scale-95 transition-all">
                   <span className="text-3xl">📅</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Matches</span>
                </button>
             </div>

             <button onClick={() => setSection(AppSection.CONTACT)} className="w-full p-6 rounded-[2.5rem] bg-gold/10 border border-gold/20 text-gold flex items-center justify-center gap-3 active:scale-95 transition-all">
                <span className="text-xl">📄</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Dossier Stratégique</span>
             </button>
          </div>
        </div>
      )}

      {section === AppSection.PREP && selectedTeam && <SongLibrary team={selectedTeam} />}
      
      {section === AppSection.HUB && (
        <div className="p-8 animate-fade-in pb-40">
          <h2 className="text-4xl font-black uppercase italic mb-8 tracking-tighter text-white">Sélectionner Nation</h2>
          <div className="grid gap-4">
            {teams.map(team => (
              <button key={team.id} onClick={() => handleSelectTeam(team)} 
                      className={`p-6 rounded-[2.5rem] border transition-all flex items-center gap-6 ${selectedTeam?.id === team.id ? 'bg-white text-black border-white' : 'bg-zinc-900 border-white/5 text-white/70'}`}>
                <span className="text-5xl">{team.flag}</span>
                <span className="font-black text-xl uppercase tracking-tighter">{team.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {section === AppSection.MATCHES && (
        <div className="p-8 animate-fade-in pb-40">
          <h2 className="text-4xl font-black uppercase italic mb-8 tracking-tighter text-white">Calendrier CAN</h2>
          <div className="space-y-4">
            {matches.map(match => (
              <div key={match.id} className="bg-zinc-900 p-6 rounded-[2.5rem] border border-white/5">
                <div className="flex justify-between items-center text-[9px] font-black text-white/30 uppercase mb-4">
                  <span>{match.date}</span>
                  <span>{match.stadium}</span>
                </div>
                <div className="flex justify-between items-center px-4">
                  <span className="text-3xl">{teams.find(t => t.id === match.homeTeamId)?.flag}</span>
                  <span className="font-black italic opacity-20">VS</span>
                  <span className="text-3xl">{teams.find(t => t.id === match.awayTeamId)?.flag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === AppSection.ADMIN && (
        <AdminManager 
          teams={teams} 
          matches={matches} 
          users={[]} 
          onUpdateTeams={setTeams} 
          onUpdateMatches={setMatches} 
        />
      )}
      
      {section === AppSection.LIVE && selectedTeam && (
        <LiveConductor 
          selectedTeam={selectedTeam} 
          externalSignal={currentLiveSignal} 
          onClose={() => setSection(AppSection.HOME)} 
        />
      )}

      {section === AppSection.CONTACT && <ProductSpecs />}
    </Layout>
  );
};

export default App;
