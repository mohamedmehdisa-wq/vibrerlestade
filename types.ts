export type Category = 'NATIONS' | 'CLUBS' | 'LEAGUES';

export interface AnimationEvent {
  id: string;
  minute: number;
  second: number;
  type: 'SHOUT' | 'SILENCE' | 'ANTHEM' | 'FLASH_WAVE' | 'JUMP' | 'CHALLENGE';
  message: string;
  targetTeamId?: string; // Si vide, pour tout le stade
  duration?: number; // en secondes
}

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
  primaryColor: string;
  secondaryColor: string;
  anthemLanguage: 'AR' | 'FR' | 'EN';
  anthemName: string;
  defaultAnimations: AnimationEvent[];
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
  stadium: string;
  group: string;
  scheduledAnimations: AnimationEvent[];
}

export enum AppSection {
  HOME = 'home',
  HUB = 'hub',
  MATCHES = 'matches',
  ADMIN = 'admin',
  LIVE = 'live',
  PREP = 'prep',
  CONTACT = 'contact'
}

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
  songId?: string;
}
