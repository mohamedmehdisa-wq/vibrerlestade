
import { Team, Match, AnimationEvent } from './types';

// Exporting CAF_COLORS used in Layout component
export const CAF_COLORS = {
  maroon: '#7B161D',
  gold: '#FEBE10',
};

const generateMoroccoAnimations = (): AnimationEvent[] => {
  const animations: AnimationEvent[] = [
    { id: 'm_silence_start', minute: 0, second: 0, type: 'SILENCE', message: 'MOMENT DE SILENCE', duration: 60 },
    { id: 'm_anthem', minute: 1, second: 0, type: 'ANTHEM', message: 'HYMNE NATIONAL', duration: 90 },
  ];
  
  // Chaque 10 minutes : SIR SIR SIR
  for (let m = 10; m <= 90; m += 10) {
    animations.push({
      id: `m_sir_${m}`,
      minute: m,
      second: 0,
      type: 'SHOUT',
      message: 'SIR ! SIR ! SIR !',
      targetTeamId: 'morocco'
    });
  }
  return animations;
};

const DEFAULT_MOROCCO_ANIMS = generateMoroccoAnimations();

export const TEAMS: Team[] = [
  { id: 'south_africa', name: 'Afrique du Sud', nickname: 'Bafana Bafana', flag: '🇿🇦', competitionId: 'can2025', primaryColor: '#007A4D', secondaryColor: '#FFCD00', anthemLanguage: 'EN', anthemName: 'Nkosi Sikelel\' iAfrika', defaultAnimations: [], songs: [] },
  { id: 'algeria', name: 'Algérie', nickname: 'Les Fennecs', flag: '🇩🇿', competitionId: 'can2025', primaryColor: '#006233', secondaryColor: '#ffffff', anthemLanguage: 'AR', anthemName: 'Kassaman', defaultAnimations: [], songs: [] },
  { id: 'angola', name: 'Angola', nickname: 'Palancas Negras', flag: '🇦🇴', competitionId: 'can2025', primaryColor: '#CE1126', secondaryColor: '#000000', anthemLanguage: 'FR', anthemName: 'Angola Avante!', defaultAnimations: [], songs: [] },
  { id: 'benin', name: 'Bénin', nickname: 'Les Guépards', flag: '🇧🇯', competitionId: 'can2025', primaryColor: '#008751', secondaryColor: '#FCD116', anthemLanguage: 'FR', anthemName: 'L\'Aube Nouvelle', defaultAnimations: [], songs: [] },
  { id: 'botswana', name: 'Botswana', nickname: 'Les Zèbres', flag: '🇧🇼', competitionId: 'can2025', primaryColor: '#75AADB', secondaryColor: '#000000', anthemLanguage: 'EN', anthemName: 'Fatshe leno la rona', defaultAnimations: [], songs: [] },
  { id: 'burkina_faso', name: 'Burkina Faso', nickname: 'Les Étalons', flag: '🇧🇫', competitionId: 'can2025', primaryColor: '#EF2B2D', secondaryColor: '#009E49', anthemLanguage: 'FR', anthemName: 'Une Seule Nuit', defaultAnimations: [], songs: [] },
  { id: 'cameroon', name: 'Cameroun', nickname: 'Lions Indomptables', flag: '🇨🇲', competitionId: 'can2025', primaryColor: '#007A5E', secondaryColor: '#CE1126', anthemLanguage: 'FR', anthemName: 'Ô Cameroun, Berceau de nos Ancêtres', defaultAnimations: [], songs: [] },
  { id: 'comoros', name: 'Comores', nickname: 'Les Cœlacanthes', flag: '🇰🇲', competitionId: 'can2025', primaryColor: '#3A75C4', secondaryColor: '#FFFFFF', anthemLanguage: 'AR', anthemName: 'Udzima wa ya Masiwa', defaultAnimations: [], songs: [] },
  { id: 'ivory_coast', name: 'Côte d’Ivoire', nickname: 'Les Éléphants', flag: '🇨🇮', competitionId: 'can2025', primaryColor: '#FF8200', secondaryColor: '#009E60', anthemLanguage: 'FR', anthemName: 'L\'Abidjanaise', defaultAnimations: [], songs: [] },
  { id: 'egypt', name: 'Égypte', nickname: 'Les Pharaons', flag: '🇪🇬', competitionId: 'can2025', primaryColor: '#CE1126', secondaryColor: '#000000', anthemLanguage: 'AR', anthemName: 'Bilady, Bilady, Bilady', defaultAnimations: [], songs: [] },
  { id: 'gabon', name: 'Gabon', nickname: 'Les Panthères', flag: '🇬🇦', competitionId: 'can2025', primaryColor: '#3674B5', secondaryColor: '#FCD116', anthemLanguage: 'FR', anthemName: 'La Concorde', defaultAnimations: [], songs: [] },
  { id: 'equatorial_guinea', name: 'Guinée Équatoriale', nickname: 'Nzalang Nacional', flag: '🇬🇶', competitionId: 'can2025', primaryColor: '#E32118', secondaryColor: '#0073CE', anthemLanguage: 'FR', anthemName: 'Caminemos pisando la senda', defaultAnimations: [], songs: [] },
  { id: 'mali', name: 'Mali', nickname: 'Les Aigles', flag: '🇲🇱', competitionId: 'can2025', primaryColor: '#FCD116', secondaryColor: '#CE1126', anthemLanguage: 'FR', anthemName: 'Le Mali', defaultAnimations: [], songs: [] },
  { id: 'morocco', name: 'Maroc', nickname: 'Lions de l’Atlas', flag: '🇲🇦', competitionId: 'can2025', primaryColor: '#C1272D', secondaryColor: '#006233', anthemLanguage: 'AR', anthemName: 'Hymne Chérifien', defaultAnimations: DEFAULT_MOROCCO_ANIMS, songs: [] },
  { id: 'mozambique', name: 'Mozambique', nickname: 'Les Mambas', flag: '🇲🇿', competitionId: 'can2025', primaryColor: '#000000', secondaryColor: '#D21034', anthemLanguage: 'FR', anthemName: 'Pátria Amada', defaultAnimations: [], songs: [] },
  { id: 'nigeria', name: 'Nigéria', nickname: 'Super Eagles', flag: '🇳🇬', competitionId: 'can2025', primaryColor: '#008751', secondaryColor: '#FFFFFF', anthemLanguage: 'EN', anthemName: 'Arise, O Compatriots', defaultAnimations: [], songs: [] },
  { id: 'uganda', name: 'Ouganda', nickname: 'Les Cranes', flag: '🇺🇬', competitionId: 'can2025', primaryColor: '#000000', secondaryColor: '#FCDC2D', anthemLanguage: 'EN', anthemName: 'Oh Uganda, Land of Beauty', defaultAnimations: [], songs: [] },
  { id: 'drc', name: 'RD Congo', nickname: 'Les Léopards', flag: '🇨🇩', competitionId: 'can2025', primaryColor: '#007FFF', secondaryColor: '#F7D618', anthemLanguage: 'FR', anthemName: 'Debout Congolais', defaultAnimations: [], songs: [] },
  { id: 'senegal', name: 'Sénégal', nickname: 'Lions de la Teranga', flag: '🇸🇳', competitionId: 'can2025', primaryColor: '#00853f', secondaryColor: '#e31b23', anthemLanguage: 'FR', anthemName: 'Le Lion rouge', defaultAnimations: [], songs: [] },
  { id: 'sudan', name: 'Soudan', nickname: 'Sokoor Al-Jediane', flag: '🇸🇩', competitionId: 'can2025', primaryColor: '#D21034', secondaryColor: '#007229', anthemLanguage: 'AR', anthemName: 'Nahnu Jund Allah Jund Al-Watan', defaultAnimations: [], songs: [] },
  { id: 'tanzania', name: 'Tanzanie', nickname: 'Taifa Stars', flag: '🇹🇿', competitionId: 'can2025', primaryColor: '#1EB53A', secondaryColor: '#000000', anthemLanguage: 'EN', anthemName: 'Mungu ibariki Afrika', defaultAnimations: [], songs: [] },
  { id: 'tunisia', name: 'Tunisie', nickname: 'Aigles de Carthage', flag: '🇹🇳', competitionId: 'can2025', primaryColor: '#E71920', secondaryColor: '#FFFFFF', anthemLanguage: 'AR', anthemName: 'Humat al-Hima', defaultAnimations: [], songs: [] },
  { id: 'zambia', name: 'Zambie', nickname: 'Chipolopolos', flag: '🇿🇲', competitionId: 'can2025', primaryColor: '#198A00', secondaryColor: '#FF7D00', anthemLanguage: 'EN', anthemName: 'Stand and Sing of Zambia, Proud and Free', defaultAnimations: [], songs: [] },
  { id: 'zimbabwe', name: 'Zimbabwe', nickname: 'Les Warriors', flag: '🇿🇼', competitionId: 'can2025', primaryColor: '#006400', secondaryColor: '#FFD700', anthemLanguage: 'EN', anthemName: 'Blessed be the Land of Zimbabwe', defaultAnimations: [], songs: [] }
];

export const MATCHES: Match[] = [
  // JOURNÉE 1
  { id: 'm1', homeTeamId: 'morocco', awayTeamId: 'comoros', date: '21 Déc', fullDate: 'Dimanche 21 Décembre 2025', time: '20:00', timestamp: 1734811200000, status: 'UPCOMING', stadium: 'Stade Moulay Abdallah', group: 'Groupe A', competitionId: 'can2025', scheduledAnimations: DEFAULT_MOROCCO_ANIMS },
  { id: 'm2', homeTeamId: 'mali', awayTeamId: 'zambia', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '17:00', timestamp: 1734886800000, status: 'UPCOMING', stadium: 'Stade de Tanger', group: 'Groupe B', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm3', homeTeamId: 'south_africa', awayTeamId: 'angola', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '19:00', timestamp: 1734894000000, status: 'UPCOMING', stadium: 'Stade de Marrakech', group: 'Groupe C', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm4', homeTeamId: 'egypt', awayTeamId: 'zimbabwe', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '21:00', timestamp: 1734901200000, status: 'UPCOMING', stadium: 'Stade Moulay Abdallah', group: 'Groupe D', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm5', homeTeamId: 'drc', awayTeamId: 'benin', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '13:30', timestamp: 1734958200000, status: 'UPCOMING', stadium: 'Stade de Tanger', group: 'Groupe E', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm6', homeTeamId: 'senegal', awayTeamId: 'botswana', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '16:00', timestamp: 1734967200000, status: 'UPCOMING', stadium: 'Stade de Fès', group: 'Groupe F', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm7', homeTeamId: 'nigeria', awayTeamId: 'tanzania', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '18:30', timestamp: 1734976200000, status: 'UPCOMING', stadium: 'Stade de Tanger', group: 'Groupe G', competitionId: 'can2025', scheduledAnimations: [] },
  { id: 'm8', homeTeamId: 'tunisia', awayTeamId: 'uganda', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '21:00', timestamp: 1734985200000, status: 'UPCOMING', stadium: 'Stade de Marrakech', group: 'Groupe H', competitionId: 'can2025', scheduledAnimations: [] },
  // ... Ajoutez les autres jours selon le même format
];
