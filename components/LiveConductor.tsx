
import React, { useState, useEffect, useRef } from 'react';
import { SyncSignal, Team } from '../types';
import { CAF_COLORS } from '../constants';

interface LiveConductorProps {
  selectedTeam: Team;
  externalSignal?: SyncSignal | null;
}

const LiveConductor: React.FC<LiveConductorProps> = ({ selectedTeam, externalSignal }) => {
  const [matchMinute, setMatchMinute] = useState(0);
  const [activeSignal, setActiveSignal] = useState<SyncSignal | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [clappingStep, setClappingStep] = useState<number>(0);
  const [jumpStep, setJumpStep] = useState<number>(0);
  const [flashActive, setFlashActive] = useState(false);
  const [activeLyricsIndex, setActiveLyricsIndex] = useState(0);
  
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
          if ('vibrate' in navigator) navigator.vibrate(50);
          return prev - 1;
        }
        window.clearInterval(countdownIntervalRef.current!);
        executeSignalNow(type, message, songId);
        return null;
      });
    }, 1000);
  };

  const executeSignalNow = (type: SyncSignal['type'], message: string, songId?: string) => {
    // EFFET STROBE PUISSANT
    setFlashActive(true);
    if ('vibrate' in navigator) navigator.vibrate(500);
    setTimeout(() => setFlashActive(false), 200);

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
      if (step > 5) {
        clearInterval(interval);
        setJumpStep(0);
        setActiveSignal(null);
      } else {
        setJumpStep(step);
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
      }
    }, 2000);
  };

  const runClappingSequence = () => {
    let step = 1;
    setClappingStep(step);
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);

    const interval = setInterval(() => {
      step++;
      if (step > 5) {
        clearInterval(interval);
        setClappingStep(0);
        setActiveSignal(null);
      } else {
        setClappingStep(step);
        setFlashActive(true);
        setTimeout(() => setFlashActive(false), 150);
        if ('vibrate' in navigator) navigator.vibrate(100);
      }
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 z-[150] bg-white flex flex-col items-center justify-center p-8 transition-all ${jumpStep > 0 ? 'animate-bounce' : ''}`}>
      {flashActive && <div className="fixed inset-0 z-[200] bg-white animate-pulse" />}
      
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Stade</span>
        </div>
        <span className="text-2xl">{selectedTeam.flag}</span>
      </div>

      <div className="w-full text-center">
        {countdown !== null ? (
          <div className="animate-fade-in">
            <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 block mb-8">SYNCHRO DANS...</span>
            <div className="text-[15rem] font-black italic leading-none" style={{ color: CAF_COLORS.maroon }}>{countdown}</div>
          </div>
        ) : activeSignal ? (
          <div className="animate-fade-in space-y-12">
            <h2 className="text-6xl font-black uppercase italic leading-none tracking-tighter" style={{ color: CAF_COLORS.maroon }}>{activeSignal.message}</h2>
            
            {jumpStep > 0 && (
              <div className="space-y-4">
                 <div className="text-[12rem] animate-bounce">👟</div>
                 <p className="text-4xl font-black text-green-600">{jumpStep} / 5</p>
              </div>
            )}

            {clappingStep > 0 && (
              <div className="space-y-4">
                 <div className="text-[12rem] transition-transform">🙌</div>
                 <p className="text-4xl font-black text-green-600">{clappingStep} / 5</p>
              </div>
            )}
            
            {!jumpStep && !clappingStep && (
              <div className="p-8 bg-slate-50 rounded-[4rem] border-2 border-slate-100">
                 <p className="text-4xl font-black italic leading-tight text-slate-800">TOUT LE MONDE ENSEMBLE !</p>
              </div>
            )}
          </div>
        ) : (
          <div className="opacity-30 space-y-6">
            <div className="text-8xl">🏟️</div>
            <p className="text-xs font-black uppercase tracking-widest">En attente du signal du Capo...</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-12 w-full px-12">
         <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-600 animate-pulse" style={{ width: '100%' }}></div>
         </div>
      </div>
    </div>
  );
};

export default LiveConductor;
