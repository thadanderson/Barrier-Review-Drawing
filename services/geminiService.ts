
import { GoogleGenAI } from "@google/genai";
import { RouletteItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getEtudeAdvice(item: RouletteItem): Promise<string> {
  const context = item.tempo ? ` at tempo ${item.tempo}` : '';
  
  const prompt = `
    You are a world-class percussion professor. 
    Provide a very short, encouraging, and expert performance tip for "${item.label}" from the source "${item.source}"${context}.
    
    If it is a Rudiment: Focus on stick control, evenness, or specific technical mechanics of that rudiment.
    If it is an Etude: Focus on musicality, phrasing, dynamics, or technical challenges typical of that specific book/author.
    
    Keep it under 2 sentences. Be specific and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });

    return response.text || "Keep a steady rhythm and listen to your dynamics!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Focus on steady time and clean articulation. You've got this!";
  }
}
