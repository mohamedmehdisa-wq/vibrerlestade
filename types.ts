
export type Category = 'NATIONS' | 'CLUBS' | 'LEAGUES';

export interface Competition {
  id: string;
  name: string;
  category: Category;
  icon: string;
}

export interface AnimationEvent {
  id: string;
  minute: number;
  second: number;
  type: 'SHOUT' | 'SILENCE' | 'ANTHEM' | 'FLASH_WAVE' | 'JUMP';
  message: string;
  targetTeamId?: string; // Si vide, pour tout le stade
  duration?: number; // en secondes
}

// Added Song interface for SongLibrary component
export interface Song {
  id: string;
  title: string;
  lyrics: string[];
}

export interface Team {
  id: string;
  name: string;
  nickname: string;
  flag: string;
  group?: string;
  competitionId: string;
  primaryColor: string;
  secondaryColor: string;
  anthemLanguage: 'AR' | 'FR' | 'EN';
  anthemName: string;
  defaultAnimations: AnimationEvent[];
  // Added songs property for SongLibrary component
  songs: Song[];
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  fullDate: string;
  time: string;
  timestamp: number;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
  stadium: string;
  group: string;
  competitionId: string;
  scheduledAnimations: AnimationEvent[];
}

export enum AppSection {
  HOME = 'home',
  HUB = 'hub',
  TEAMS = 'teams',
  MATCHES = 'matches',
  ADMIN = 'admin',
  LIVE = 'live',
  PREP = 'prep',
  CONTACT = 'contact'
}

// Added User interface for App session management
export interface User {
  email: string;
  joinedAt: number;
}

export interface SyncSignal {
  id: string;
  timestamp: number;
  message: string;
  type: 'FLASH' | 'VIBRATE' | 'SHOUT' | 'ANTHEM' | 'SONG' | 'CLAPPING' | 'JUMP' | 'SILENCE';
  countdown?: number;
  targetTeamId?: string;
  // Added songId for live orchestration
  songId?: string;
}
