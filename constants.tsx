
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
  { id: 'morocco', competitionId: 'can2025', name: 'Maroc', flag: '🇲🇦', group: 'A', motto: 'Dima Maghrib!', primaryColor: '#C1272D', secondaryColor: '#006233', anthem: "Hymne Chérifien", anthemLyrics: ["Manbita al-ahrar"], songs: [{ id: 'ma_sir', title: 'Sir! Sir! Sir!', lyrics: ['SIR!', 'SIR!', 'SIR!'], bpm: 124 }] },
  { id: 'senegal', competitionId: 'can2025', name: 'Sénégal', flag: '🇸🇳', group: 'L', motto: 'Un Peuple, Un But, Une Foi', primaryColor: '#00853f', secondaryColor: '#e31b23', anthem: "Le Lion rouge", anthemLyrics: ["Pincez tous vos koras"], songs: [] },
  { id: 'ivory_coast', competitionId: 'can2025', name: 'Côte d\'Ivoire', flag: '🇨🇮', group: 'G', motto: 'Union, Discipline, Travail', primaryColor: '#FF8200', secondaryColor: '#009E60', anthem: "L'Abidjanaise", anthemLyrics: ["Abidjan"], songs: [] },
  { id: 'nigeria', competitionId: 'can2025', name: 'Nigéria', flag: '🇳🇬', group: 'D', motto: 'Unity and Faith, Peace and Progress', primaryColor: '#008751', secondaryColor: '#ffffff', anthem: "Arise, O Compatriots", anthemLyrics: ["Arise"], songs: [] },
  { id: 'egypt', competitionId: 'can2025', name: 'Égypte', flag: '🇪🇬', group: 'C', motto: 'Bilady', primaryColor: '#CE1126', secondaryColor: '#000000', anthem: "Bilady", anthemLyrics: ["Bilady"], songs: [] },
  { id: 'algeria', competitionId: 'can2025', name: 'Algérie', flag: '🇩🇿', group: 'E', motto: '1, 2, 3 Viva l\'Algérie', primaryColor: '#006233', secondaryColor: '#ffffff', anthem: "Kassaman", anthemLyrics: ["Kassaman"], songs: [] },
  { id: 'cameroon', competitionId: 'can2025', name: 'Cameroun', flag: '🇨🇲', group: 'J', motto: 'Paix, Travail, Patrie', primaryColor: '#007A5E', secondaryColor: '#FCD116', anthem: "Chant de Ralliement", anthemLyrics: ["Cameroun"], songs: [] },
  { id: 'tunisia', competitionId: 'can2025', name: 'Tunisie', flag: '🇹🇳', group: 'B', motto: 'Liberté, Dignité, Justice', primaryColor: '#E71921', secondaryColor: '#ffffff', anthem: "Humat al-Hima", anthemLyrics: ["Humat al-Hima"], songs: [] }
];

export const MATCHES: Match[] = [
  { id: 'can_1', competitionId: 'can2025', homeTeamId: 'morocco', awayTeamId: 'egypt', date: '21 Déc', timestamp: 1734739200000, fullDate: '21 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Stade Moulay Abdallah', group: 'Groupe A' },
  { id: 'can_2', competitionId: 'can2025', homeTeamId: 'senegal', awayTeamId: 'nigeria', date: '22 Déc', timestamp: 1734825600000, fullDate: '22 Décembre 2025', time: '17:00', status: 'UPCOMING', stadium: 'Stade de Tanger', group: 'Groupe L' },
  { id: 'can_3', competitionId: 'can2025', homeTeamId: 'ivory_coast', awayTeamId: 'cameroon', date: '23 Déc', timestamp: 1734912000000, fullDate: '23 Décembre 2025', time: '20:00', status: 'UPCOMING', stadium: 'Stade d\'Abidjan', group: 'Groupe G' }
];
