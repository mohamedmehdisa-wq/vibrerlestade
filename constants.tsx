
import { Team, Match, Competition } from './types';

export const CAF_COLORS = {
  maroon: '#7B161D',
  green: '#008B51',
  white: '#FFFFFF',
  gold: '#FEBE10',
  softGray: '#F8F9FA',
  darkText: '#2D2D2D'
};

export const COMPETITIONS: Competition[] = [
  { id: 'can2025', name: 'CAN 2025', category: 'NATIONS', icon: '🌍' }
];

export const TEAMS: Team[] = [
  { id: 'morocco', competitionId: 'can2025', name: 'Maroc', flag: '🇲🇦', group: 'A', motto: 'Dima Maghrib!', primaryColor: '#C1272D', secondaryColor: '#006233', anthem: "Hymne Chérifien", anthemLyrics: ["Manbita al-ahrar", "Mashriqa al-anwar"], songs: [{ id: 'ma_sir', title: 'Sir! Sir! Sir!', lyrics: ['SIR!', 'SIR!', 'SIR!'], bpm: 124 }, { id: 'ma_hkayat', title: 'Al Hkaya', lyrics: ['الحكاية بدات فميكسيكو', 'اهو هو هو'], bpm: 110 }] },
  { id: 'cote_ivoire', competitionId: 'can2025', name: 'Côte d\'Ivoire', flag: '🇨🇮', group: 'E', motto: 'Union, Discipline, Travail', primaryColor: '#FF8200', secondaryColor: '#009E60', anthem: "L'Abidjanaise", anthemLyrics: ["Salut ô terre d'espérance"], songs: [] },
  { id: 'senegal', competitionId: 'can2025', name: 'Sénégal', flag: '🇸🇳', group: 'C', motto: 'Un Peuple, Un But, Une Foi', primaryColor: '#00853f', secondaryColor: '#e31b23', anthem: "Le Lion rouge", anthemLyrics: ["Pincez tous vos koras"], songs: [] },
  { id: 'egypt', competitionId: 'can2025', name: 'Égypte', flag: '🇪🇬', group: 'B', motto: 'Bilady', primaryColor: '#CE1126', secondaryColor: '#000000', anthem: "Bilady", anthemLyrics: ["Bilady"], songs: [] },
  { id: 'cameroon', competitionId: 'can2025', name: 'Cameroun', flag: '🇨🇲', group: 'C', motto: 'Paix, Travail, Patrie', primaryColor: '#007A5E', secondaryColor: '#FCD116', anthem: "Chant de Ralliement", anthemLyrics: ["Ô Cameroun"], songs: [] },
  { id: 'algeria', competitionId: 'can2025', name: 'Algérie', flag: '🇩🇿', group: 'E', motto: 'One, Two, Three, Viva l\'Algérie', primaryColor: '#006233', secondaryColor: '#ffffff', anthem: "Kassaman", anthemLyrics: ["Kassaman"], songs: [] },
  { id: 'tunisia', competitionId: 'can2025', name: 'Tunisie', flag: '🇹🇳', group: 'D', motto: 'Liberté, Dignité, Justice', primaryColor: '#E70013', secondaryColor: '#ffffff', anthem: "Humat al-Hima", anthemLyrics: ["Humat al-Hima"], songs: [] },
  { id: 'nigeria', competitionId: 'can2025', name: 'Nigéria', flag: '🇳🇬', group: 'D', motto: 'Unity and Faith', primaryColor: '#008751', secondaryColor: '#ffffff', anthem: "Arise", anthemLyrics: ["Arise"], songs: [] },
  { id: 'south_africa', competitionId: 'can2025', name: 'Afrique du Sud', flag: '🇿🇦', group: 'B', motto: 'Unity in Diversity', primaryColor: '#007749', secondaryColor: '#FFB81C', anthem: "Nkosi", anthemLyrics: ["Nkosi"], songs: [] },
  { id: 'dr_congo', competitionId: 'can2025', name: 'RDC', flag: '🇨🇩', group: 'C', motto: 'Justice, Paix, Travail', primaryColor: '#007FFF', secondaryColor: '#F7D618', anthem: "Debout Congolais", anthemLyrics: ["Debout"], songs: [] },
  { id: 'mali', competitionId: 'can2025', name: 'Mali', flag: '🇲🇱', group: 'A', motto: 'Un Peuple', primaryColor: '#FCD116', secondaryColor: '#CE1126', anthem: "Le Mali", anthemLyrics: ["Mali"], songs: [] },
  { id: 'burkina_faso', competitionId: 'can2025', name: 'Burkina Faso', flag: '🇧🇫', group: 'E', motto: 'La Patrie ou la Mort', primaryColor: '#EF3340', secondaryColor: '#009739', anthem: "Une Seule Nuit", anthemLyrics: ["Burkina"], songs: [] },
  { id: 'angola', competitionId: 'can2025', name: 'Angola', flag: '🇦🇴', group: 'B', motto: 'A Unidade', primaryColor: '#CE1126', secondaryColor: '#000000', anthem: "Angola Avante!", anthemLyrics: ["Angola"], songs: [] },
  { id: 'zambia', competitionId: 'can2025', name: 'Zambie', flag: '🇿🇲', group: 'A', motto: 'One Zambia', primaryColor: '#198A00', secondaryColor: '#EF3340', anthem: "Stand and Sing", anthemLyrics: ["Zambia"], songs: [] },
  { id: 'comoros', competitionId: 'can2025', name: 'Comores', flag: '🇰🇲', group: 'A', motto: 'Unité', primaryColor: '#3A75C4', secondaryColor: '#EF3340', anthem: "Udzima", anthemLyrics: ["Udzima"], songs: [] },
  { id: 'zimbabwe', competitionId: 'can2025', name: 'Zimbabwe', flag: '🇿🇼', group: 'B', motto: 'Unity', primaryColor: '#FFD200', secondaryColor: '#000000', anthem: "Simudzai", anthemLyrics: ["Zimbabwe"], songs: [] },
  { id: 'benin', competitionId: 'can2025', name: 'Bénin', flag: '🇧🇯', group: 'C', motto: 'Fraternité', primaryColor: '#008751', secondaryColor: '#FCD116', anthem: "L'Aube Nouvelle", anthemLyrics: ["Bénin"], songs: [] },
  { id: 'botswana', competitionId: 'can2025', name: 'Botswana', flag: '🇧🇼', group: 'C', motto: 'Pula', primaryColor: '#75AADB', secondaryColor: '#000000', anthem: "Fatshe", anthemLyrics: ["Botswana"], songs: [] },
  { id: 'tanzania', competitionId: 'can2025', name: 'Tanzanie', flag: '🇹🇿', group: 'D', motto: 'Uhuru', primaryColor: '#1EB53A', secondaryColor: '#000000', anthem: "Mungu", anthemLyrics: ["Tanzanie"], songs: [] },
  { id: 'uganda', competitionId: 'can2025', name: 'Ouganda', flag: '🇺🇬', group: 'D', motto: 'For God', primaryColor: '#000000', secondaryColor: '#EF3340', anthem: "Oh Uganda", anthemLyrics: ["Uganda"], songs: [] },
  { id: 'mozambique', competitionId: 'can2025', name: 'Mozambique', flag: '🇲🇿', group: 'E', motto: 'Unidade', primaryColor: '#009739', secondaryColor: '#000000', anthem: "Pátria", anthemLyrics: ["Mozambique"], songs: [] },
  { id: 'sudan', competitionId: 'can2025', name: 'Soudan', flag: '🇸🇩', group: 'E', motto: 'An-Nasr', primaryColor: '#D21034', secondaryColor: '#007229', anthem: "Nahnu", anthemLyrics: ["Soudan"], songs: [] },
  { id: 'guinea_eq', competitionId: 'can2025', name: 'Guinée Éq.', flag: '🇬🇶', group: 'E', motto: 'Unidad', primaryColor: '#E32118', secondaryColor: '#0073CE', anthem: "Caminemos", anthemLyrics: ["Guinée"], songs: [] },
  { id: 'gabon', competitionId: 'can2025', name: 'Gabon', flag: '🇬🇦', group: 'C', motto: 'Union', primaryColor: '#36A100', secondaryColor: '#3A75C4', anthem: "La Concorde", anthemLyrics: ["Gabon"], songs: [] },
  { id: 'mali', competitionId: 'can2025', name: 'Mali', flag: '🇲🇱', group: 'A', motto: 'Un Peuple', primaryColor: '#009739', secondaryColor: '#FCD116', anthem: "Hymne", anthemLyrics: ["Mali"], songs: [] }
];

export const MATCHES: Match[] = [
  // 1ère JOURNÉE
  { id: 'm1_1', competitionId: 'can2025', homeTeamId: 'morocco', awayTeamId: 'comoros', date: 'Dim 21 Déc', fullDate: 'Dimanche 21 Décembre 2025', time: '20:00', status: 'FINISHED', stadium: 'Rabat', group: 'A', homeScore: 2, awayScore: 0 },
  { id: 'm1_2', competitionId: 'can2025', homeTeamId: 'mali', awayTeamId: 'zambia', date: 'Lun 22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '17:00', status: 'FINISHED', stadium: 'Fès', group: 'A', homeScore: 1, awayScore: 1 },
  { id: 'm1_3', competitionId: 'can2025', homeTeamId: 'south_africa', awayTeamId: 'angola', date: 'Lun 22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '18:30', status: 'FINISHED', stadium: 'Casablanca', group: 'B', homeScore: 2, awayScore: 1 },
  { id: 'm1_4', competitionId: 'can2025', homeTeamId: 'egypt', awayTeamId: 'zimbabwe', date: 'Lun 22 Déc', fullDate: 'Lundi 22 Décembre 2025', time: '20:00', status: 'FINISHED', stadium: 'Marrakech', group: 'B', homeScore: 2, awayScore: 1 },
  { id: 'm1_5', competitionId: 'can2025', homeTeamId: 'dr_congo', awayTeamId: 'benin', date: 'Mar 23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '17:00', status: 'FINISHED', stadium: 'Fès', group: 'C', homeScore: 1, awayScore: 0 },
  { id: 'm1_6', competitionId: 'can2025', homeTeamId: 'senegal', awayTeamId: 'botswana', date: 'Mar 23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '18:30', status: 'FINISHED', stadium: 'Tanger', group: 'C', homeScore: 3, awayScore: 0 },
  { id: 'm1_7', competitionId: 'can2025', homeTeamId: 'nigeria', awayTeamId: 'tanzania', date: 'Mar 23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '20:00', status: 'FINISHED', stadium: 'Agadir', group: 'D', homeScore: 2, awayScore: 1 },
  { id: 'm1_8', competitionId: 'can2025', homeTeamId: 'tunisia', awayTeamId: 'uganda', date: 'Mar 23 Déc', fullDate: 'Mardi 23 Décembre 2025', time: '21:00', status: 'UPCOMING', stadium: 'Casablanca', group: 'D' },
  { id: 'm1_9', competitionId: 'can2025', homeTeamId: 'burkina_faso', awayTeamId: 'guinea_eq', date: 'Mer 24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '13:30', status: 'UPCOMING', stadium: 'Agadir', group: 'E' },
  { id: 'm1_10', competitionId: 'can2025', homeTeamId: 'algeria', awayTeamId: 'sudan', date: 'Mer 24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '16:00', status: 'UPCOMING', stadium: 'Agadir', group: 'E' },
  { id: 'm1_11', competitionId: 'can2025', homeTeamId: 'cote_ivoire', awayTeamId: 'mozambique', date: 'Mer 24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '18:30', status: 'UPCOMING', stadium: 'Casablanca', group: 'E' },
  { id: 'm1_12', competitionId: 'can2025', homeTeamId: 'cameroon', awayTeamId: 'gabon', date: 'Mer 24 Déc', fullDate: 'Mercredi 24 Décembre 2025', time: '21:00', status: 'UPCOMING', stadium: 'Tanger', group: 'C' },

  // 2ème JOURNÉE
  { id: 'm2_1', competitionId: 'can2025', homeTeamId: 'angola', awayTeamId: 'zimbabwe', date: 'Ven 26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '13:30', status: 'UPCOMING', stadium: 'Casablanca', group: 'B' },
  { id: 'm2_2', competitionId: 'can2025', homeTeamId: 'egypt', awayTeamId: 'south_africa', date: 'Ven 26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '16:00', status: 'UPCOMING', stadium: 'Marrakech', group: 'B' },
  { id: 'm2_3', competitionId: 'can2025', homeTeamId: 'zambia', awayTeamId: 'comoros', date: 'Ven 26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '18:30', status: 'UPCOMING', stadium: 'Fès', group: 'A' },
  { id: 'm2_4', competitionId: 'can2025', homeTeamId: 'morocco', awayTeamId: 'mali', date: 'Ven 26 Déc', fullDate: 'Vendredi 26 Décembre 2025', time: '21:00', status: 'UPCOMING', stadium: 'Rabat', group: 'A' },
  { id: 'm2_5', competitionId: 'can2025', homeTeamId: 'benin', awayTeamId: 'botswana', date: 'Sam 27 Déc', fullDate: 'Samedi 27 Décembre 2025', time: '13:30', status: 'UPCOMING', stadium: 'Fès', group: 'C' },
  { id: 'm2_6', competitionId: 'can2025', homeTeamId: 'senegal', awayTeamId: 'dr_congo', date: 'Sam 27 Déc', fullDate: 'Samedi 27 Décembre 2025', time: '16:00', status: 'UPCOMING', stadium: 'Tanger', group: 'C' },
  { id: 'm2_7', competitionId: 'can2025', homeTeamId: 'uganda', awayTeamId: 'tanzania', date: 'Sam 27 Déc', fullDate: 'Samedi 27 Décembre 2025', time: '18:30', status: 'UPCOMING', stadium: 'Agadir', group: 'D' },
  { id: 'm2_8', competitionId: 'can2025', homeTeamId: 'nigeria', awayTeamId: 'tunisia', date: 'Sam 27 Déc', fullDate: 'Samedi 27 Décembre 2025', time: '21:00', status: 'UPCOMING', stadium: 'Marrakech', group: 'D' },
  { id: 'm2_9', competitionId: 'can2025', homeTeamId: 'gabon', awayTeamId: 'mozambique', date: 'Dim 28 Déc', fullDate: 'Dimanche 28 Décembre 2025', time: '13:30', status: 'UPCOMING', stadium: 'Casablanca', group: 'C' },
  { id: 'm2_10', competitionId: 'can2025', homeTeamId: 'guinea_eq', awayTeamId: 'sudan', date: 'Dim 28 Déc', fullDate: 'Dimanche 28 Décembre 2025', time: '16:00', status: 'UPCOMING', stadium: 'Agadir', group: 'E' },
  { id: 'm2_11', competitionId: 'can2025', homeTeamId: 'algeria', awayTeamId: 'burkina_faso', date: 'Dim 28 Déc', fullDate: 'Dimanche 28 Décembre 2025', time: '18:30', status: 'UPCOMING', stadium: 'Marrakech', group: 'E' },
  { id: 'm2_12', competitionId: 'can2025', homeTeamId: 'cote_ivoire', awayTeamId: 'cameroon', date: 'Dim 28 Déc', fullDate: 'Dimanche 28 Décembre 2025', time: '21:00', status: 'UPCOMING', stadium: 'Casablanca', group: 'E' },

  // 3ème JOURNÉE
  { id: 'm3_1', competitionId: 'can2025', homeTeamId: 'angola', awayTeamId: 'egypt', date: 'Lun 29 Déc', fullDate: 'Lundi 29 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Casablanca', group: 'B' },
  { id: 'm3_2', competitionId: 'can2025', homeTeamId: 'zimbabwe', awayTeamId: 'south_africa', date: 'Lun 29 Déc', fullDate: 'Lundi 29 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Marrakech', group: 'B' },
  { id: 'm3_3', competitionId: 'can2025', homeTeamId: 'comoros', awayTeamId: 'mali', date: 'Lun 29 Déc', fullDate: 'Lundi 29 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Fès', group: 'A' },
  { id: 'm3_4', competitionId: 'can2025', homeTeamId: 'zambia', awayTeamId: 'morocco', date: 'Lun 29 Déc', fullDate: 'Lundi 29 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Rabat', group: 'A' },
  { id: 'm3_5', competitionId: 'can2025', homeTeamId: 'tanzania', awayTeamId: 'tunisia', date: 'Mar 30 Déc', fullDate: 'Mardi 30 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Agadir', group: 'D' },
  { id: 'm3_6', competitionId: 'can2025', homeTeamId: 'uganda', awayTeamId: 'nigeria', date: 'Mar 30 Déc', fullDate: 'Mardi 30 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Marrakech', group: 'D' },
  { id: 'm3_7', competitionId: 'can2025', homeTeamId: 'botswana', awayTeamId: 'dr_congo', date: 'Mar 30 Déc', fullDate: 'Mardi 30 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Tanger', group: 'C' },
  { id: 'm3_8', competitionId: 'can2025', homeTeamId: 'benin', awayTeamId: 'senegal', date: 'Mar 30 Déc', fullDate: 'Mardi 30 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Fès', group: 'C' },
  { id: 'm3_9', competitionId: 'can2025', homeTeamId: 'guinea_eq', awayTeamId: 'algeria', date: 'Mer 31 Déc', fullDate: 'Mercredi 31 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Marrakech', group: 'E' },
  { id: 'm3_10', competitionId: 'can2025', homeTeamId: 'sudan', awayTeamId: 'burkina_faso', date: 'Mer 31 Déc', fullDate: 'Mercredi 31 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Agadir', group: 'E' },
  { id: 'm3_11', competitionId: 'can2025', homeTeamId: 'gabon', awayTeamId: 'cote_ivoire', date: 'Mer 31 Déc', fullDate: 'Mercredi 31 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Casablanca', group: 'E' },
  { id: 'm3_12', competitionId: 'can2025', homeTeamId: 'mozambique', awayTeamId: 'cameroon', date: 'Mer 31 Déc', fullDate: 'Mercredi 31 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Tanger', group: 'C' }
];

export const APP_MODULES = [
  { id: 'sync_engine', name: 'Stadium Sync Engine', description: 'Moteur de synchronisation binaire ultra-basse latence.' },
  { id: 'director_live', name: 'Stadium Director', description: 'Interface de contrôle pour les chefs de tribunes.' }
];
