
import { GoogleGenAI, Type } from "@google/genai";

const STORAGE_KEY = 'vibrer_stade_chants_cache';

export const generateChantLyrics = async (country: string) => {
  const cache = localStorage.getItem(STORAGE_KEY);
  const parsedCache = cache ? JSON.parse(cache) : {};
  
  if (!navigator.onLine && parsedCache[country]) {
    return parsedCache[country];
  }

  // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
  if (!process.env.API_KEY || process.env.API_KEY === '' || process.env.API_KEY === 'undefined') {
    console.warn("Vibrer le Stade : API_KEY manquante.");
    return parsedCache[country] || [
      "Allez les Lions, rugissez !", 
      "Dima Maghrib, pour l'éternité !", 
      "L'Afrique vibre avec vous !"
    ];
  }

  try {
    // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    
    // The GenerateContentResponse object features a text property (not a method)
    const textOutput = response.text?.trim();
    if (!textOutput) throw new Error("Réponse vide");

    const data = JSON.parse(textOutput);
    const lyrics = data.lyrics || [];
    
    if (lyrics.length > 0) {
      parsedCache[country] = lyrics;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedCache));
    }
    
    return lyrics;
  } catch (error) {
    console.error("Erreur Gemini Service:", error);
    return parsedCache[country] || ["Vibrez le stade !", "Ensemble vers la coupe !"];
  }
};
