
import React, { useState, useEffect } from 'react';
import { AppSection, Team, Match, SyncSignal } from './types';
import { TEAMS, MATCHES, CAF_COLORS } from './constants';
import Layout from './components/Layout';
import LiveConductor from './components/LiveConductor';
import ProductSpecs from './components/ProductSpecs';

const liveChannel = new BroadcastChannel('stadium_sync');

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentLiveSignal, setCurrentLiveSignal] = useState<SyncSignal | null>(null);

  useEffect(() => {
    liveChannel.onmessage = (event) => {
      const signal: SyncSignal = event.data;
      setCurrentLiveSignal(signal);
      if (section !== AppSection.ADMIN && section !== AppSection.LIVE && selectedTeam) {
        setSection(AppSection.LIVE);
      }
    };
  }, [section, selectedTeam]);

  const testVibration = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([300, 100, 100, 100, 100, 100, 300]);
    } else {
      alert("Haptique non supporté.");
    }
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setSection(AppSection.HOME);
    setSelectedMatch(null); 
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const publishSignal = (type: SyncSignal['type'], message: string, songId?: string) => {
    const signal: SyncSignal = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      message,
      type,
      songId
    };
    liveChannel.postMessage(signal);
    setCurrentLiveSignal(signal);
  };

  const renderAdminContent = () => {
    if (!isAdminAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8 animate-fade-in">
          <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-slate-100 text-3xl"> 🏟️ </div>
          <h2 className="text-3xl font-black uppercase mb-4 italic tracking-tighter" style={{ color: CAF_COLORS.maroon }}>Staff Stadium</h2>
          <button 
            onClick={() => setIsAdminAuthenticated(true)} 
            className="text-white px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl pulse-gold" 
            style={{ backgroundColor: CAF_COLORS.maroon }}
          >
            Accéder au Panel Capo
          </button>
        </div>
      );
    }

    return (
      <div className="animate-fade-in h-full flex flex-col">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <ProductSpecs />
          <div className="px-6 space-y-6 pb-20">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest px-2">Console de Direction (PULSE)</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => publishSignal('FLASH', 'FLASH GÉNÉRAL')} className="bg-gold text-black p-6 rounded-[2.5rem] font-black uppercase text-[10px] italic shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-2">
                <span className="text-2xl">📸</span> FLASH
              </button>
              <button onClick={() => publishSignal('SHOUT', 'TOUT LE MONDE CRIE !')} className="bg-red-600 text-white p-6 rounded-[2.5rem] font-black uppercase text-[10px] italic shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-2">
                <span className="text-2xl">🗣️</span> CRIER
              </button>
              <button onClick={() => publishSignal('CLAPPING', 'CLAPPING VIKING')} className="bg-white text-black border-2 border-slate-100 p-6 rounded-[2.5rem] font-black uppercase text-[10px] italic shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-2">
                <span className="text-2xl">🙌</span> CLAPPING
              </button>
              <button onClick={() => publishSignal('JUMP', 'TOUT LE MONDE SAUTE')} className="bg-[#008B51] text-white p-6 rounded-[2.5rem] font-black uppercase text-[10px] italic shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-2">
                <span className="text-2xl">👟</span> SAUTER
              </button>
              <button onClick={() => publishSignal('SONG', 'SIR! SIR! SIR!', 'ma_sir')} className="col-span-2 bg-black text-white p-6 rounded-[2.5rem] font-black uppercase italic shadow-xl active:scale-95 transition-transform">
                🦁 DÉPLOYER : SIR ! SIR ! SIR !
              </button>
            </div>
            <button onClick={() => setIsAdminAuthenticated(false)} className="w-full py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Quitter la Direction</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout activeSection={section} onNavigate={setSection}>
      {section === AppSection.HOME && (
        <div className="animate-fade-in flex flex-col items-center">
          <div className="w-full pt-16 pb-28 px-8 text-center rounded-b-[4.5rem] shadow-[0_20px_50px_rgba(123,22,29,0.3)] relative overflow-hidden" 
               style={{ background: `linear-gradient(135deg, ${CAF_COLORS.maroon} 0%, #4A0B11 100%)` }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">VIBRER LE STADE</h1>
            <div className="bg-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl flex justify-between items-center border border-white/20 shadow-inner">
              <div className="text-left">
                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] block mb-1">Mon Pays</span>
                <span className="text-white font-black text-xl leading-none">{selectedTeam ? `${selectedTeam.flag} ${selectedTeam.name}` : 'CHOISIR...'}</span>
              </div>
              <button onClick={() => setSection(AppSection.HUB)} className="bg-gold text-black px-6 py-3 rounded-full text-[10px] font-black uppercase shadow-lg hover:scale-105 transition-transform active:scale-95">Changer</button>
            </div>
          </div>

          <div className="w-full px-8 -mt-12 z-20 space-y-5">
             <button onClick={() => setSection(AppSection.LIVE)} 
                     className="w-full bg-white border-[6px] border-[#7B161D] p-12 rounded-[4.5rem] shadow-2xl flex flex-col items-center gap-4 transition-all active:scale-95 group relative overflow-hidden">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-500">🏟️</span>
                <span className="text-2xl font-black uppercase italic text-[#7B161D] tracking-tighter">Accès Tribune Live</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connecté au Capo</p>
                </div>
             </button>

             <button onClick={testVibration} 
                     className="w-full bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all border border-white/5">
               <span className="text-xl">📳</span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tester la synchro tactile</span>
             </button>
             
             {selectedTeam && (
               <button onClick={() => setSection(AppSection.PREP)} 
                       className="w-full bg-gradient-to-r from-[#008B51] to-[#006233] text-white p-6 rounded-[2.5rem] shadow-xl flex items-center justify-between group active:scale-95 transition-all">
                 <div className="flex flex-col text-left">
                   <span className="text-lg font-black uppercase italic leading-none">Chants Ultras</span>
                   <span className="text-[9px] font-bold opacity-60 uppercase tracking-widest mt-1">Générés par IA VOX</span>
                 </div>
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🎵</div>
               </button>
             )}

             <button onClick={() => setSection(AppSection.ADMIN)} className="w-full py-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity">
                Console de Direction (Staff)
             </button>
          </div>
        </div>
      )}

      {section === AppSection.HUB && (
        <div className="p-8 animate-fade-in bg-white min-h-screen">
          <h2 className="text-4xl font-black uppercase italic mb-10 tracking-tighter">Toutes les Nations</h2>
          <div className="grid grid-cols-1 gap-4 pb-20 overflow-y-auto no-scrollbar max-h-[75vh]">
            {TEAMS.map(team => (
              <button key={team.id} onClick={() => handleSelectTeam(team)} className={`p-6 rounded-[2.8rem] border-2 transition-all flex items-center justify-between ${selectedTeam?.id === team.id ? 'border-transparent shadow-2xl text-white bg-[#7B161D]' : 'bg-white border-slate-50 text-slate-800 shadow-sm'}`}>
                <div className="flex items-center gap-6">
                   <span className="text-5xl">{team.flag}</span>
                   <div className="text-left">
                      <span className="block font-black text-xl uppercase tracking-tighter leading-none">{team.name}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${selectedTeam?.id === team.id ? 'text-white/60' : 'text-slate-400'}`}>Groupe {team.group}</span>
                   </div>
                </div>
                {selectedTeam?.id === team.id && <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      {section === AppSection.MATCHES && (
        <div className="p-8 animate-fade-in bg-white min-h-screen">
          <h2 className="text-4xl font-black uppercase italic mb-10 tracking-tighter">Matchs</h2>
          <div className="space-y-6 pb-40 overflow-y-auto no-scrollbar max-h-[78vh]">
            {MATCHES.map((match) => {
              const homeTeam = TEAMS.find(t => t.id === match.homeTeamId);
              const awayTeam = TEAMS.find(t => t.id === match.awayTeamId);
              return (
                <div key={match.id} onClick={() => handleMatchClick(match)} className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{match.date}</span>
                    <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase bg-red-100 text-[#7B161D]">Groupe {match.group}</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <span className="text-6xl">{homeTeam?.flag}</span>
                      <span className="text-[11px] font-black uppercase text-center">{homeTeam?.name}</span>
                    </div>
                    <div className="text-2xl font-black italic text-slate-300">VS</div>
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <span className="text-6xl">{awayTeam?.flag}</span>
                      <span className="text-[11px] font-black uppercase text-center">{awayTeam?.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {section === AppSection.ADMIN && renderAdminContent()}
      {section === AppSection.LIVE && selectedTeam && <LiveConductor selectedTeam={selectedTeam} externalSignal={currentLiveSignal} />}
      
      {section === AppSection.PREP && selectedTeam && (
        <div className="p-8 animate-fade-in bg-white min-h-screen">
           <div className="flex justify-between items-center mb-10">
             <h2 className="text-4xl font-black uppercase italic tracking-tighter">Ultras {selectedTeam.name}</h2>
             <span className="text-4xl">{selectedTeam.flag}</span>
           </div>
           <div className="space-y-8 pb-32">
              {selectedTeam.songs.map(song => (
                <div key={song.id} className="bg-slate-50 p-8 rounded-[3.5rem] border border-slate-100 shadow-sm">
                   <h3 className="font-black uppercase italic text-2xl text-[#2D2D2D] mb-4">{song.title}</h3>
                   <div className="bg-white p-8 rounded-[2.5rem] mb-4 border border-slate-100 shadow-inner">
                      {song.lyrics.map((l, i) => <p key={i} className="text-lg font-black text-[#7B161D] uppercase mb-2">"{l}"</p>)}
                   </div>
                   <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest text-center">Tempo : {song.bpm} BPM</p>
                </div>
              ))}
              <div className="p-8 bg-blue-50 rounded-[3rem] border border-blue-100 text-center">
                 <p className="text-xs font-bold text-blue-600 uppercase mb-2 tracking-widest">IA VOX ACTIVE</p>
                 <p className="text-[10px] text-blue-400">Génération de nouveaux chants locaux en cours...</p>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
