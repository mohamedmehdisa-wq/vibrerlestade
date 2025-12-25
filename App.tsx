
import React, { useState, useEffect, useMemo } from 'react';
import { AppSection, Team, Match, SyncSignal, User } from './types';
import { TEAMS as INITIAL_TEAMS, MATCHES as INITIAL_MATCHES, CAF_COLORS } from './constants';
import Layout from './components/Layout';
import LiveConductor from './components/LiveConductor';
import ProductSpecs from './components/ProductSpecs';
import AdminManager from './components/AdminManager';
import InfoPages from './components/InfoPages';

const liveChannel = new BroadcastChannel('stadium_sync');

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem('vibrer_stade_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('vibrer_stade_matches');
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('vibrer_stade_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vibrer_stade_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginEmail, setLoginEmail] = useState('');
  
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(() => {
    const saved = localStorage.getItem('vibrer_stade_selected_team');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentLiveSignal, setCurrentLiveSignal] = useState<SyncSignal | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [legalType, setLegalType] = useState<'CGV' | 'PRIVACY' | 'CONTACT' | null>(null);

  useEffect(() => {
    localStorage.setItem('vibrer_stade_teams', JSON.stringify(teams));
    localStorage.setItem('vibrer_stade_matches', JSON.stringify(matches));
    localStorage.setItem('vibrer_stade_users', JSON.stringify(users));
  }, [teams, matches, users]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    liveChannel.onmessage = (event) => {
      const signal: SyncSignal = event.data;
      setCurrentLiveSignal(signal);
      
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }

      if (section !== AppSection.ADMIN && section !== AppSection.LIVE && selectedTeam) {
        setSection(AppSection.LIVE);
      }
    };

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
    setUsers(prev => [...prev.filter(u => u.email !== loginEmail), newUser]);
    localStorage.setItem('vibrer_stade_session', JSON.stringify(newUser));
    setSection(AppSection.HOME);
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    localStorage.setItem('vibrer_stade_selected_team', JSON.stringify(team));
    setSection(AppSection.HOME);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 font-['Outfit'] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B161D]/40 to-black pointer-events-none" />
        <div className="relative z-10 w-full max-w-sm text-center animate-fade-in">
           <div className="mb-10 flex justify-center">
              <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl text-5xl">Stadium</div>
           </div>
           <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">VIBRER<br/>LE STADE</h1>
           <p className="text-gold font-black text-[11px] uppercase tracking-[0.5em] mb-16 opacity-70">CAN 2025 OFFICIAL FAN SYNC</p>
           
           <form onSubmit={handleLogin} className="space-y-5">
              <input 
                type="email" 
                required 
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="VOTRE ADRESSE EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white text-center font-bold placeholder:text-white/20 focus:border-gold outline-none transition-all shadow-inner backdrop-blur-md"
              />
              <button 
                type="submit"
                className="w-full bg-white text-black p-6 rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-gold transition-all transform active:scale-95"
              >
                Accéder au stade
              </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <Layout activeSection={section} onNavigate={setSection}>
      <div className="fixed top-4 left-4 z-[180] flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
        <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_10px_green]' : 'bg-red-500 shadow-[0_0_10px_red]'}`}></div>
        <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{isOnline ? 'Online' : 'Offline Mode'}</span>
      </div>

      {section === AppSection.HOME && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className="w-full pt-20 pb-28 px-8 text-center rounded-b-[5rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative overflow-hidden" 
               style={{ background: selectedTeam ? `linear-gradient(135deg, ${selectedTeam.primaryColor} 0%, #1a0304 100%)` : `linear-gradient(135deg, ${CAF_COLORS.maroon} 0%, #1a0304 100%)` }}>
            <h1 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none drop-shadow-2xl">VIBRER<br/>LE STADE</h1>
            
            <div className="bg-black/20 p-6 rounded-[3rem] backdrop-blur-3xl flex justify-between items-center border border-white/10 shadow-inner">
              <div className="text-left">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] block mb-1">Ma Nation</span>
                <span className="text-white font-black text-2xl leading-none tracking-tight">{selectedTeam ? `${selectedTeam.flag} ${selectedTeam.name}` : 'SÉLECTIONNER'}</span>
              </div>
              <button onClick={() => setSection(AppSection.HUB)} className="bg-white text-black px-8 py-3.5 rounded-full text-[10px] font-black uppercase shadow-xl hover:bg-gold transition-colors">Changer</button>
            </div>
          </div>

          <div className="w-full px-8 -mt-16 z-20 space-y-6">
             <button onClick={() => setSection(AppSection.LIVE)} 
                     className="w-full bg-white text-black p-12 rounded-[5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col items-center gap-5 transition-all active:scale-95 group border-[12px]"
                     style={{ borderColor: selectedTeam?.primaryColor || CAF_COLORS.maroon }}>
                <span className="text-8xl animate-bounce">🏟️</span>
                <div className="text-center">
                  <span className="text-4xl font-black uppercase italic tracking-tighter block leading-none">SESSION LIVE</span>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mt-3">Synchronisation Tribune</p>
                </div>
             </button>
             
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setSection(AppSection.MATCHES)} className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[4rem] border border-white/10 flex flex-col items-center gap-3">
                   <span className="text-4xl">📅</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Calendrier</span>
                </button>
                <button onClick={() => setSection(AppSection.ADMIN)} className="bg-gold p-8 rounded-[4rem] flex flex-col items-center gap-3 text-black font-black">
                   <span className="text-4xl">👑</span>
                   <span className="text-[10px] uppercase tracking-widest">Capo Zone</span>
                </button>
             </div>
          </div>
        </div>
      )}

      {section === AppSection.HUB && (
        <div className="p-8 animate-fade-in pb-40">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">Nations</h2>
            <button onClick={() => setSection(AppSection.HOME)} className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center font-black">X</button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {teams.map(team => (
              <button key={team.id} onClick={() => handleSelectTeam(team)} 
                      className={`p-8 rounded-[3rem] border-2 transition-all flex items-center justify-between ${selectedTeam?.id === team.id ? 'border-gold shadow-2xl stadium-gradient' : 'bg-zinc-900 border-white/5 text-white/70'}`}>
                <div className="flex items-center gap-8">
                   <span className="text-6xl drop-shadow-xl">{team.flag}</span>
                   <div className="text-left">
                     <span className="block font-black text-2xl uppercase tracking-tighter leading-none">{team.name}</span>
                     <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{team.group}</span>
                   </div>
                </div>
                {selectedTeam?.id === team.id && <div className="w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#FEBE10]"></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {section === AppSection.MATCHES && (
        <div className="p-8 animate-fade-in overflow-y-auto no-scrollbar pb-40">
          <h2 className="text-5xl font-black uppercase italic mb-12 tracking-tighter text-white">Calendrier</h2>
          <div className="space-y-6">
            {matches.map((match) => {
              const homeTeam = teams.find(t => t.id === match.homeTeamId);
              const awayTeam = teams.find(t => t.id === match.awayTeamId);
              return (
                <div key={match.id} className="bg-zinc-900/50 backdrop-blur-xl p-10 rounded-[4rem] border border-white/5">
                  <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">{match.date} • {match.stadium}</span>
                    <span className="text-[10px] font-black text-gold uppercase tracking-widest">{match.time}</span>
                  </div>
                  <div className="flex justify-around items-center text-white">
                    <div className="flex flex-col items-center gap-3">
                       <span className="text-6xl drop-shadow-2xl">{homeTeam?.flag || '🚩'}</span>
                       <span className="text-[11px] font-black uppercase tracking-widest">{homeTeam?.name || 'Inconnu'}</span>
                    </div>
                    <div className="text-2xl font-black italic text-white/10 px-4">VS</div>
                    <div className="flex flex-col items-center gap-3">
                       <span className="text-6xl drop-shadow-2xl">{awayTeam?.flag || '🚩'}</span>
                       <span className="text-[11px] font-black uppercase tracking-widest">{awayTeam?.name || 'Inconnu'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {section === AppSection.ADMIN && (
        <div className="animate-fade-in h-full flex flex-col bg-black min-h-screen">
          {!isAdminAuthenticated ? (
            <div className="flex flex-col items-center justify-center min-h-[75vh] text-center p-12">
              <div className="w-32 h-32 bg-white/5 rounded-[3rem] flex items-center justify-center mb-10 border border-white/10 text-5xl">👑</div>
              <h2 className="text-4xl font-black uppercase mb-6 italic tracking-tighter text-white">CAPO ZONE</h2>
              <p className="text-xs text-white/30 uppercase tracking-[0.3em] mb-12">Accès réservé aux chefs de tribune</p>
              <button 
                onClick={() => setIsAdminAuthenticated(true)} 
                className="w-full bg-white text-black px-12 py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] shadow-2xl active:scale-95 transition-all" 
              >
                S'authentifier
              </button>
            </div>
          ) : (
            <AdminManager 
              teams={teams} 
              matches={matches} 
              users={users}
              onUpdateTeams={setTeams}
              onUpdateMatches={setMatches}
            />
          )}
        </div>
      )}
      
      {section === AppSection.LIVE && selectedTeam && (
        <LiveConductor 
          selectedTeam={selectedTeam} 
          externalSignal={currentLiveSignal} 
          onClose={() => setSection(AppSection.HOME)} 
        />
      )}
    </Layout>
  );
};

export default App;
