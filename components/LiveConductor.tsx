
import React, { useState, useEffect, useRef } from 'react';
import { SyncSignal, Team } from '../types';

interface LiveConductorProps {
  selectedTeam: Team;
  externalSignal?: SyncSignal | null;
  onClose?: () => void;
}

const LiveConductor: React.FC<LiveConductorProps> = ({ selectedTeam, externalSignal, onClose }) => {
  const [activeSignal, setActiveSignal] = useState<SyncSignal | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [clappingStep, setClappingStep] = useState<number>(0);
  const [jumpStep, setJumpStep] = useState<number>(0);
  const [flashActive, setFlashActive] = useState(false);
  
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [flashEnabled, setFlashEnabled] = useState(true);
  
  const countdownIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (externalSignal) {
      triggerPrep(externalSignal.type, externalSignal.message, externalSignal.songId);
    }
  }, [externalSignal]);

  const triggerPrep = (type: SyncSignal['type'], message: string, songId?: string) => {
    setCountdown(3);
    setActiveSignal({ id: 'temp', timestamp: Date.now(), type, message, songId });
    
    if (countdownIntervalRef.current) window.clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = window.setInterval(() => {
      setCountdown(prev => {
        if (prev && prev > 1) {
          if (vibrationEnabled && 'vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
          }
          return prev - 1;
        }
        window.clearInterval(countdownIntervalRef.current!);
        executeSignalNow(type, message, songId);
        return null;
      });
    }, 1000);
  };

  const executeSignalNow = (type: SyncSignal['type'], message: string, songId?: string) => {
    if (flashEnabled) {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 400);
    }
    
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(800);
    }

    if (type === 'JUMP') {
      runJumpSequence();
    } else if (type === 'CLAPPING') {
      runClappingSequence();
    } else {
      setTimeout(() => setActiveSignal(null), 5000);
    }
  };

  const runJumpSequence = () => {
    let step = 1;
    setJumpStep(step);
    const interval = setInterval(() => {
      step++;
      if (step > 6) {
        clearInterval(interval);
        setJumpStep(0);
        setActiveSignal(null);
      } else {
        setJumpStep(step);
        if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(300);
      }
    }, 1200);
  };

  const runClappingSequence = () => {
    let step = 1;
    setClappingStep(step);
    const interval = setInterval(() => {
      step++;
      if (step > 8) {
        clearInterval(interval);
        setClappingStep(0);
        setActiveSignal(null);
      } else {
        setClappingStep(step);
        if (flashEnabled) {
          setFlashActive(true);
          setTimeout(() => setFlashActive(false), 100);
        }
        if (vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(100);
      }
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center p-8 transition-all ${jumpStep > 0 ? 'animate-bounce' : ''}`} style={{ borderTop: `12px solid ${selectedTeam.primaryColor}` }}>
      {flashActive && flashEnabled && <div className="fixed inset-0 z-[250] bg-white opacity-90" />}
      
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
        <button onClick={onClose} className="bg-white/10 p-4 rounded-3xl backdrop-blur-2xl border border-white/10 active:scale-90 transition-transform">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">LIVE STADIUM</span>
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">{selectedTeam.flag} {selectedTeam.name}</span>
        </div>
      </div>

      <div className="w-full text-center relative z-[210]">
        {countdown !== null ? (
          <div className="animate-fade-in scale-110">
            <span className="text-sm font-black uppercase tracking-[0.6em] text-white/30 block mb-2">PRÉPAREZ-VOUS</span>
            <div className="text-[20rem] font-black italic leading-none text-white tracking-tighter drop-shadow-2xl">{countdown}</div>
          </div>
        ) : activeSignal ? (
          <div className="animate-fade-in space-y-12">
            <h2 className="text-8xl font-black uppercase italic leading-none tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">{activeSignal.message}</h2>
            {jumpStep > 0 && <div className="text-[12rem] animate-bounce filter drop-shadow-2xl">👟</div>}
            {clappingStep > 0 && <div className="text-[12rem] animate-pulse filter drop-shadow-2xl">🙌</div>}
          </div>
        ) : (
          <div className="opacity-20 space-y-10 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-4 border-dashed border-white flex items-center justify-center animate-spin-slow">
              <span className="text-7xl animate-pulse">🏟️</span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] max-w-[250px] leading-relaxed">Attente du signal du Capo de la tribune {selectedTeam.name}...</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-24 flex gap-6 z-[260]">
          <button 
            onClick={() => {
              setVibrationEnabled(!vibrationEnabled);
              if (!vibrationEnabled && 'vibrate' in navigator) navigator.vibrate(50);
            }} 
            className={`flex flex-col items-center gap-2 p-6 rounded-[2.5rem] backdrop-blur-2xl border transition-all duration-300 ${vibrationEnabled ? 'bg-white/20 border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-black/40 border-white/10 opacity-30 grayscale'}`}
          >
            <span className="text-4xl">{vibrationEnabled ? '📳' : '🔇'}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">{vibrationEnabled ? 'Vibreur' : 'Silencieux'}</span>
          </button>

          <button 
            onClick={() => setFlashEnabled(!flashEnabled)} 
            className={`flex flex-col items-center gap-2 p-6 rounded-[2.5rem] backdrop-blur-2xl border transition-all duration-300 ${flashEnabled ? 'bg-white/20 border-white shadow-[0_0_40px_rgba(255,255,255,0.2)]' : 'bg-black/40 border-white/10 opacity-30 grayscale'}`}
          >
            <span className="text-4xl">{flashEnabled ? '🔦' : '🚫'}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">{flashEnabled ? 'Flash ON' : 'Flash OFF'}</span>
          </button>
      </div>

      <div className="absolute bottom-12 w-full px-16 opacity-30">
         <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-pulse" style={{ width: '100%' }}></div>
         </div>
      </div>
    </div>
  );
};

export default LiveConductor;
