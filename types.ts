
export type Category = 'NATIONS' | 'CLUBS' | 'LEAGUES';

export interface Competition {
  id: string;
  name: string;
  category: Category;
  icon: string;
}

export interface User {
  email: string;
  joinedAt: number;
  favoriteTeamId?: string;
}

export interface Team {
  id: string;
  name: string;
  flag: string;
  group?: string;
  competitionId: string;
  motto: string;
  primaryColor: string;
  secondaryColor: string;
  anthem: string;
  anthemLyrics: string[];
  songs: Song[];
}

export interface Song {
  id: string;
  title: string;
  lyrics: string[];
  bpm: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  timestamp: number;
  fullDate: string;
  time: string;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
  stadium: string;
  group: string;
  competitionId: string;
}

export enum AppSection {
  HOME = 'home',
  HUB = 'hub',
  TEAMS = 'teams',
  MATCHES = 'matches',
  ADMIN = 'admin',
  LIVE = 'live',
  PREP = 'prep',
  LEGAL = 'legal',
  CONTACT = 'contact'
}

export interface SyncSignal {
  id: string;
  timestamp: number;
  message: string;
  type: 'FLASH' | 'VIBRATE' | 'SHOUT' | 'ANTHEM' | 'SONG' | 'CLAPPING' | 'JUMP';
  countdown?: number;
  songId?: string;
}
