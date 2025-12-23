
import { GoogleGenAI, Type } from "@google/genai";

const STORAGE_KEY = 'vibrer_stade_chants_cache';

const getCachedChants = (country: string): string[] | null => {
  const cache = localStorage.getItem(STORAGE_KEY);
  if (!cache) return null;
  try {
    const parsedCache = JSON.parse(cache);
    return parsedCache[country] || null;
  } catch (e) {
    return null;
  }
};

const setCachedChants = (country: string, lyrics: string[]) => {
  const cache = localStorage.getItem(STORAGE_KEY);
  const parsedCache = cache ? JSON.parse(cache) : {};
  parsedCache[country] = lyrics;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCache));
};

export const generateChantLyrics = async (country: string) => {
  const cached = getCachedChants(country);
  
  if (cached && !navigator.onLine) {
    console.log(`Mode hors-ligne : Utilisation du cache pour ${country}`);
    return cached;
  }

  // Vérification de la clé API
  if (!process.env.API_KEY || process.env.API_KEY === 'undefined') {
    console.warn("API_KEY manquante. Utilisation des chants par défaut.");
    return cached || ["Allez les Lions!", "Pour la victoire!", "Dima Maghrib!"];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère 3 lignes de chant de supporter passionné pour l'équipe nationale de football du ${country} pour la CAN 2025. Utilise des mots locaux et de l'énergie.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    const lyrics = JSON.parse(response.text).lyrics;
    setCachedChants(country, lyrics); 
    return lyrics;
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return cached || ["Allez, allez!", "Tous ensemble!", "Vibrez le stade!"];
  }
};
