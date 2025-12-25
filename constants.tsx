import { Team, Match, AnimationEvent } from './types';

export const CAF_COLORS = {
  maroon: '#7B161D',
  gold: '#FEBE10',
};

const generateMatchAnimations = (homeId: string, awayId: string): AnimationEvent[] => {
  const animations: AnimationEvent[] = [
    { id: 'start_silence', minute: 0, second: 0, type: 'SILENCE', message: 'SILENCE TOTAL - RESPECT', duration: 30 },
    { id: 'anthem_home', minute: 1, second: 0, type: 'ANTHEM', message: 'HYMNE NATIONAL', targetTeamId: homeId, duration: 90 },
    { id: 'anthem_away', minute: 3, second: 0, type: 'ANTHEM', message: 'HYMNE NATIONAL', targetTeamId: awayId, duration: 90 },
  ];

  // Logique spécifique Maroc : SIR SIR SIR toutes les 10 minutes
  if (homeId === 'morocco' || awayId === 'morocco') {
    for (let m = 10; m <= 90; m += 10) {
      animations.push({
        id: `sir_${m}`,
        minute: m,
        second: 0,
        type: 'SHOUT',
        message: 'SIR ! SIR ! SIR !',
        targetTeamId: 'morocco'
      });
    }
  }

  return animations.sort((a, b) => (a.minute * 60 + a.second) - (b.minute * 60 + b.second));
};

export const TEAMS: Team[] = [
  { id: 'south_africa', name: 'Afrique du Sud', nickname: 'Bafana Bafana', flag: '🇿🇦', primaryColor: '#007A4D', secondaryColor: '#FFCD00', anthemLanguage: 'EN', anthemName: 'Nkosi Sikelel\' iAfrika', defaultAnimations: [], songs: [] },
  { id: 'algeria', name: 'Algérie', nickname: 'Les Fennecs', flag: '🇩🇿', primaryColor: '#006233', secondaryColor: '#ffffff', anthemLanguage: 'AR', anthemName: 'Kassaman', defaultAnimations: [], songs: [] },
  { id: 'angola', name: 'Angola', nickname: 'Palancas Negras', flag: '🇦🇴', primaryColor: '#CE1126', secondaryColor: '#000000', anthemLanguage: 'FR', anthemName: 'Angola Avante!', defaultAnimations: [], songs: [] },
  { id: 'benin', name: 'Bénin', nickname: 'Les Guépards', flag: '🇧🇯', primaryColor: '#008751', secondaryColor: '#FCD116', anthemLanguage: 'FR', anthemName: 'L\'Aube Nouvelle', defaultAnimations: [], songs: [] },
  { id: 'botswana', name: 'Botswana', nickname: 'Les Zèbres', flag: '🇧🇼', primaryColor: '#75AADB', secondaryColor: '#000000', anthemLanguage: 'EN', anthemName: 'Fatshe leno la rona', defaultAnimations: [], songs: [] },
  { id: 'burkina_faso', name: 'Burkina Faso', nickname: 'Les Étalons', flag: '🇧🇫', primaryColor: '#EF2B2D', secondaryColor: '#009E49', anthemLanguage: 'FR', anthemName: 'Une Seule Nuit', defaultAnimations: [], songs: [] },
  { id: 'cameroon', name: 'Cameroun', nickname: 'Lions Indomptables', flag: '🇨🇲', primaryColor: '#007A5E', secondaryColor: '#CE1126', anthemLanguage: 'FR', anthemName: 'Ô Cameroun', defaultAnimations: [], songs: [] },
  { id: 'comoros', name: 'Comores', nickname: 'Les Cœlacanthes', flag: '🇰🇲', primaryColor: '#3A75C4', secondaryColor: '#FFFFFF', anthemLanguage: 'AR', anthemName: 'Udzima', defaultAnimations: [], songs: [] },
  { id: 'ivory_coast', name: 'Côte d’Ivoire', nickname: 'Les Éléphants', flag: '🇨🇮', primaryColor: '#FF8200', secondaryColor: '#009E60', anthemLanguage: 'FR', anthemName: 'L\'Abidjanaise', defaultAnimations: [], songs: [] },
  { id: 'egypt', name: 'Égypte', nickname: 'Les Pharaons', flag: '🇪🇬', primaryColor: '#CE1126', secondaryColor: '#000000', anthemLanguage: 'AR', anthemName: 'Bilady', defaultAnimations: [], songs: [] },
  { id: 'gabon', name: 'Gabon', nickname: 'Les Panthères', flag: '🇬🇦', primaryColor: '#3674B5', secondaryColor: '#FCD116', anthemLanguage: 'FR', anthemName: 'La Concorde', defaultAnimations: [], songs: [] },
  { id: 'equatorial_guinea', name: 'Guinée Éq.', nickname: 'Nzalang Nacional', flag: '🇬🇶', primaryColor: '#E32118', secondaryColor: '#0073CE', anthemLanguage: 'FR', anthemName: 'Caminemos', defaultAnimations: [], songs: [] },
  { id: 'mali', name: 'Mali', nickname: 'Les Aigles', flag: '🇲🇱', primaryColor: '#FCD116', secondaryColor: '#CE1126', anthemLanguage: 'FR', anthemName: 'Le Mali', defaultAnimations: [], songs: [] },
  { id: 'morocco', name: 'Maroc', nickname: 'Lions de l’Atlas', flag: '🇲🇦', primaryColor: '#C1272D', secondaryColor: '#006233', anthemLanguage: 'AR', anthemName: 'Hymne Chérifien', defaultAnimations: [], songs: [] },
  { id: 'mozambique', name: 'Mozambique', nickname: 'Les Mambas', flag: '🇲🇿', primaryColor: '#000000', secondaryColor: '#D21034', anthemLanguage: 'FR', anthemName: 'Pátria Amada', defaultAnimations: [], songs: [] },
  { id: 'nigeria', name: 'Nigeria', nickname: 'Super Eagles', flag: '🇳🇬', primaryColor: '#008751', secondaryColor: '#FFFFFF', anthemLanguage: 'EN', anthemName: 'Arise', defaultAnimations: [], songs: [] },
  { id: 'uganda', name: 'Ouganda', nickname: 'Les Cranes', flag: '🇺🇬', primaryColor: '#000000', secondaryColor: '#FCDC2D', anthemLanguage: 'EN', anthemName: 'Oh Uganda', defaultAnimations: [], songs: [] },
  { id: 'drc', name: 'RD Congo', nickname: 'Les Léopards', flag: '🇨🇩', primaryColor: '#007FFF', secondaryColor: '#F7D618', anthemLanguage: 'FR', anthemName: 'Debout Congolais', defaultAnimations: [], songs: [] },
  { id: 'senegal', name: 'Sénégal', nickname: 'Lions de la Teranga', flag: '🇸🇳', primaryColor: '#00853f', secondaryColor: '#e31b23', anthemLanguage: 'FR', anthemName: 'Le Lion rouge', defaultAnimations: [], songs: [] },
  { id: 'sudan', name: 'Soudan', nickname: 'Sokoor Al-Jediane', flag: '🇸🇩', primaryColor: '#D21034', secondaryColor: '#007229', anthemLanguage: 'AR', anthemName: 'Nahnu Jund Allah', defaultAnimations: [], songs: [] },
  { id: 'tanzania', name: 'Tanzanie', nickname: 'Taifa Stars', flag: '🇹🇿', primaryColor: '#1EB53A', secondaryColor: '#000000', anthemLanguage: 'EN', anthemName: 'Mungu ibariki', defaultAnimations: [], songs: [] },
  { id: 'tunisia', name: 'Tunisie', nickname: 'Aigles de Carthage', flag: '🇹🇳', primaryColor: '#E71920', secondaryColor: '#FFFFFF', anthemLanguage: 'AR', anthemName: 'Humat al-Hima', defaultAnimations: [], songs: [] },
  { id: 'zambia', name: 'Zambie', nickname: 'Chipolopolos', flag: '🇿🇲', primaryColor: '#198A00', secondaryColor: '#FF7D00', anthemLanguage: 'EN', anthemName: 'Stand and Sing', defaultAnimations: [], songs: [] },
  { id: 'zimbabwe', name: 'Zimbabwe', nickname: 'Warriors', flag: '🇿🇼', primaryColor: '#006400', secondaryColor: '#FFD700', anthemLanguage: 'EN', anthemName: 'Blessed be the Land', defaultAnimations: [], songs: [] }
];

export const MATCHES: Match[] = [
  // JOURNÉE 1
  { id: 'm1', homeTeamId: 'morocco', awayTeamId: 'comoros', date: '21 Déc', fullDate: 'Dimanche 21 Décembre 2025', time: '20:00', timestamp: 1734811200000, stadium: 'Stade Moulay Abdallah', group: 'Groupe A', scheduledAnimations: generateMatchAnimations('morocco', 'comoros') },
  { id: 'm2', homeTeamId: 'mali', awayTeamId: 'zambia', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '17:00', timestamp: 1734886800000, stadium: 'Stade de Tanger', group: 'Groupe B', scheduledAnimations: generateMatchAnimations('mali', 'zambia') },
  { id: 'm3', homeTeamId: 'south_africa', awayTeamId: 'angola', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '19:00', timestamp: 1734894000000, stadium: 'Stade de Marrakech', group: 'Groupe C', scheduledAnimations: generateMatchAnimations('south_africa', 'angola') },
  { id: 'm4', homeTeamId: 'egypt', awayTeamId: 'zimbabwe', date: '22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '21:00', timestamp: 1734901200000, stadium: 'Stade Moulay Abdallah', group: 'Groupe D', scheduledAnimations: generateMatchAnimations('egypt', 'zimbabwe') },
  { id: 'm5', homeTeamId: 'drc', awayTeamId: 'benin', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '13:30', timestamp: 1734958200000, stadium: 'Stade de Tanger', group: 'Groupe E', scheduledAnimations: generateMatchAnimations('drc', 'benin') },
  { id: 'm6', homeTeamId: 'senegal', awayTeamId: 'botswana', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '16:00', timestamp: 1734967200000, stadium: 'Stade de Fès', group: 'Groupe F', scheduledAnimations: generateMatchAnimations('senegal', 'botswana') },
  { id: 'm7', homeTeamId: 'nigeria', awayTeamId: 'tanzania', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '18:30', timestamp: 1734976200000, stadium: 'Stade de Tanger', group: 'Groupe G', scheduledAnimations: generateMatchAnimations('nigeria', 'tanzania') },
  { id: 'm8', homeTeamId: 'tunisia', awayTeamId: 'uganda', date: '23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '21:00', timestamp: 1734985200000, stadium: 'Stade de Marrakech', group: 'Groupe H', scheduledAnimations: generateMatchAnimations('tunisia', 'uganda') },
  { id: 'm9', homeTeamId: 'burkina_faso', awayTeamId: 'equatorial_guinea', date: '24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '13:30', timestamp: 1735044600000, stadium: 'Stade de Tanger', group: 'Groupe I', scheduledAnimations: generateMatchAnimations('burkina_faso', 'equatorial_guinea') },
  { id: 'm10', homeTeamId: 'algeria', awayTeamId: 'sudan', date: '24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '16:00', timestamp: 1735053600000, stadium: 'Stade Moulay Abdallah', group: 'Groupe J', scheduledAnimations: generateMatchAnimations('algeria', 'sudan') },
  { id: 'm11', homeTeamId: 'ivory_coast', awayTeamId: 'mozambique', date: '24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '18:30', timestamp: 1735062600000, stadium: 'Stade de Fès', group: 'Groupe K', scheduledAnimations: generateMatchAnimations('ivory_coast', 'mozambique') },
  { id: 'm12', homeTeamId: 'cameroon', awayTeamId: 'gabon', date: '24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '21:00', timestamp: 1735071600000, stadium: 'Stade de Marrakech', group: 'Groupe L', scheduledAnimations: generateMatchAnimations('cameroon', 'gabon') },
  
  // JOURNÉE 2 (EXTRAIT)
  { id: 'm13', homeTeamId: 'angola', awayTeamId: 'zimbabwe', date: '26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '13:30', timestamp: 1735216200000, stadium: 'Stade de Tanger', group: 'Groupe C', scheduledAnimations: generateMatchAnimations('angola', 'zimbabwe') },
  { id: 'm16', homeTeamId: 'morocco', awayTeamId: 'mali', date: '26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '21:00', timestamp: 1735243200000, stadium: 'Stade Moulay Abdallah', group: 'Groupe A', scheduledAnimations: generateMatchAnimations('morocco', 'mali') }
];
