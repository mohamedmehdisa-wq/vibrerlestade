
import React, { useState } from 'react';
import { Team, Song } from '../types';
import { generateChantLyrics } from '../services/geminiService';

interface SongLibraryProps {
  team: Team;
}

const SongLibrary: React.FC<SongLibraryProps> = ({ team }) => {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [aiChant, setAiChant] = useState<string[] | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleGenerateAi = async () => {
    setLoadingAi(true);
    const lyrics = await generateChantLyrics(team.name);
    setAiChant(lyrics);
    setLoadingAi(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Anthem Library</h2>
          <p className="text-slate-400">Chants officiels de {team.name}</p>
        </div>
        <div className="text-4xl">{team.flag}</div>
      </div>

      <div className="space-y-4">
        {team.songs.map((song) => (
          <div 
            key={song.id}
            onClick={() => setActiveSong(activeSong?.id === song.id ? null : song)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${activeSong?.id === song.id ? 'bg-slate-100 text-slate-900 border-white' : 'bg-slate-800 border-slate-700 text-white'}`}
          >
            <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg">{song.title}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSong?.id === song.id ? 'bg-slate-900 text-white' : 'bg-slate-700'}`}>
                    {activeSong?.id === song.id ? 'II' : '▶'}
                </div>
            </div>
            
            {activeSong?.id === song.id && (
                <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 animate-fade-in">
                    {song.lyrics.map((line, idx) => (
                        <p key={idx} className="text-xl font-black uppercase leading-tight italic">
                            {line}
                        </p>
                    ))}
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">AI Chant Generator</h3>
            <p className="text-sm text-indigo-100 mb-4">Besoin d'un nouveau cri de guerre ? L'IA génère des paroles uniques basées sur l'actualité de l'équipe.</p>
            
            {aiChant ? (
                <div className="bg-white/10 p-4 rounded-xl mb-4">
                    {aiChant.map((l, i) => <p key={i} className="font-bold text-lg mb-1">"{l}"</p>)}
                </div>
            ) : null}

            <button 
                onClick={handleGenerateAi}
                disabled={loadingAi}
                className="w-full py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
                {loadingAi ? 'Génération...' : 'Générer un chant Magique'}
            </button>
        </div>
        <div className="absolute -right-4 -bottom-4 text-9xl opacity-10">🪄</div>
      </div>
    </div>
  );
};

export default SongLibrary;
