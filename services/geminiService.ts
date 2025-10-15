
import { GoogleGenAI } from "@google/genai";
import { EXPEDITIONS } from '../constants';
import type { Difficulty } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTripSuggestion = async (
  duration: string,
  fitness: Difficulty,
  interests: string
): Promise<string> => {
  const expeditionsContext = EXPEDITIONS.map(exp => 
    `- ${exp.name}: Duration ${exp.duration} days, Difficulty ${exp.difficulty}, Description: ${exp.shortDescription}`
  ).join('\n');

  const prompt = `
    You are an expert tour guide for Mountain Challenger, a company specializing in treks and expeditions in Gilgit-Baltistan, Pakistan. Your goal is to create a personalized trek recommendation based on the user's preferences.

    The user has provided the following information:
    - Desired Trip Duration: Around ${duration} days
    - Fitness Level: ${fitness}
    - Primary Interests: ${interests}

    Based on this, suggest ONE ideal expedition from our available options. Provide the recommendation in a clear, engaging format. Start with the recommended expedition name as a main heading. Then, provide a section explaining "Why It's a Great Fit", another for "Trip Highlights" (as a bulleted list), and a final "Fitness Advisory" section.

    Here is the list of our available treks. Choose the best match from this list ONLY:
    ${expeditionsContext}

    Your response should be friendly, encouraging, and professional. Do not use markdown for headings like '##'. Just use bold text or simple text for titles.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // FIX: Re-throw the error so the UI component can handle the error state.
    throw error;
  }
};
