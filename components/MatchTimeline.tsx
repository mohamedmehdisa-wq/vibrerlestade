import React from 'react';
import { Match, Team, AnimationEvent } from '../types';

interface MatchTimelineProps {
  match: Match;
  teams: Team[];
  onSelectAnimation: (anim: AnimationEvent) => void;
}

const MatchTimeline: React.FC<MatchTimelineProps> = ({ match, teams, onSelectAnimation }) => {
  const homeTeam = teams.find(t => t.id === match.homeTeamId);
  const awayTeam = teams.find(t => t.id === match.awayTeamId);

  return (
    <div className="bg-zinc-900/50 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/5 animate-fade-in">
      {/* Header du Match */}
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
         <div className="text-center group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10 group-hover:border-gold transition-colors">
              <span className="text-5xl">{homeTeam?.flag}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">{homeTeam?.nickname}</span>
         </div>
         
         <div className="text-center">
            <div className="text-xs font-black italic text-gold uppercase tracking-[0.3em] mb-1">STADIUM SYNC</div>
            <div className="text-[40px] font-black italic opacity-10 leading-none">VS</div>
            <div className="text-[9px] font-bold text-white/30 mt-2 uppercase">Précision 1/1000s</div>
         </div>

         <div className="text-center group">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10 group-hover:border-gold transition-colors">
              <span className="text-5xl">{awayTeam?.flag}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block">{awayTeam?.nickname}</span>
         </div>
      </div>

      <h3 className="text-xs font-black text-white/40 uppercase tracking-widest mb-6 px-2">Programme des Animations</h3>

      {/* Liste des animations */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
        {match.scheduledAnimations.length === 0 ? (
          <div className="py-20 text-center opacity-20 italic text-sm uppercase font-black">Validation Capo en cours...</div>
        ) : (
          match.scheduledAnimations.map((anim) => (
            <div 
              key={anim.id} 
              onClick={() => onSelectAnimation(anim)}
              className="group flex items-center gap-5 p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:border-gold/50 transition-all cursor-pointer active:scale-[0.98]"
            >
              {/* Timing */}
              <div className="w-16 h-16 rounded-2xl bg-black/40 flex flex-col items-center justify-center border border-white/10 shrink-0 group-hover:bg-gold/10 group-hover:border-gold/30">
                <span className="text-lg font-black text-white">{anim.minute}'</span>
                <span className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{anim.second}s</span>
              </div>
              
              {/* Détails de l'action */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                    anim.type === 'SILENCE' ? 'bg-zinc-700 text-white' : 
                    anim.type === 'ANTHEM' ? 'bg-blue-600 text-white' : 
                    anim.type === 'SHOUT' ? 'bg-red-600 text-white' : 'bg-gold text-black'
                  }`}>
                    {anim.type}
                  </span>
                  {anim.targetTeamId && (
                    <span className="text-[9px] font-black text-gold/80 uppercase">
                       {teams.find(t => t.id === anim.targetTeamId)?.flag} {teams.find(t => t.id === anim.targetTeamId)?.name}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black uppercase tracking-tight text-white/90 group-hover:text-white">{anim.message}</h4>
              </div>

              {/* Indicateur d'interaction */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">▶</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Bulle Réseau */}
      <div className="mt-8 p-6 bg-gold/5 rounded-[2rem] border border-gold/10">
        <p className="text-[10px] text-gold font-bold leading-relaxed opacity-80 uppercase tracking-tight">
          💡 En cas de saturation réseau, ce programme est stocké sur votre téléphone. Suivez le compte à rebours visuel pour crier en même temps que le reste du stade.
        </p>
      </div>
    </div>
  );
};

export default MatchTimeline;
