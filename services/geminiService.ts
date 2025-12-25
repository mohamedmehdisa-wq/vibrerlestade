import { GoogleGenAI, Type } from "@google/genai";

const STORAGE_KEY = 'vibrer_stade_chants_cache';

export const generateChantLyrics = async (country: string) => {
  const cache = localStorage.getItem(STORAGE_KEY);
  const parsedCache = cache ? JSON.parse(cache) : {};
  
  if (!navigator.onLine && parsedCache[country]) {
    return parsedCache[country];
  }

  // process.env.API_KEY est injecté par Vite au moment du build
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === '' || apiKey === 'undefined') {
    console.warn("API_KEY manquante. Utilisation du mode dégradé.");
    return parsedCache[country] || [
      "Allez les Lions!", 
      "Dima Maghrib!", 
      "Fierté Africaine!"
    ];
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère 3 lignes courtes et percutantes de chant de supporter pour l'équipe du ${country} à la CAN 2025. Style Ultras, maximum d'énergie. Réponds uniquement en JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lyrics: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["lyrics"]
        }
      }
    });
    
    const textOutput = response.text;
    if (!textOutput) throw new Error("Réponse vide de l'IA");

    const data = JSON.parse(textOutput);
    const lyrics = data.lyrics || [];
    
    if (lyrics.length > 0) {
      parsedCache[country] = lyrics;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCache));
    }
    
    return lyrics;
  } catch (error) {
    console.error("Gemini Error:", error);
    return parsedCache[country] || ["Vibrez le stade!", "Allez l'Afrique!", "Ensemble!"];
  }
};
