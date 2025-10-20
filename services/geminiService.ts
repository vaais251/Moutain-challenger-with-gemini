import { GoogleGenAI, Type } from "@google/genai";
import { EXPEDITIONS } from '../constants';
import type { Difficulty, Expedition, PackingList } from '../types';
import { getApiKey } from "../config";

// Interface for the detailed image object
export interface ImageDetail {
    url: string;
    title: string;
    description: string;
}

// Interface for map data from the AI
export interface MapData {
    center: { lat: number; lng: number };
    zoom: number;
    markers: { name: string; lat: number; lng: number }[];
}

// Base interface for streamed results
export interface StreamResult {
    type: string;
    data?: any;
}


// Interface for the enhanced trip plan streamed results
export interface PlanStreamResult extends StreamResult {
    type: 'text' | 'map' | 'images' | 'alternatives' | 'error';
}

// Interface for the dream itinerary streamed results
export interface DreamStreamResult extends StreamResult {
    type: 'text' | 'image' | 'error';
}


/**
 * Generates a short, inspiring paragraph about a type of adventure.
 */
export const generateAdventureBlurb = async (interest: string): Promise<string> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
        You are an inspiring travel guide for Mountain Challenger, a trekking company in Gilgit-Baltistan, Pakistan.
        A user has expressed interest in an adventure focused on "${interest}".
        Write a short, evocative 2-3 sentence paragraph that describes this kind of adventure in the Karakoram mountains.
        Your tone should be exciting and encourage them to explore the available expeditions.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating adventure blurb:", error);
        throw new Error("Failed to generate AI description.");
    }
};

/**
 * Sorts expeditions based on a natural language query from the user.
 */
export const getAiSortedExpeditions = async (query: string): Promise<string[]> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const ai = new GoogleGenAI({ apiKey });

    // Provide a simplified list for the AI to process
    const expeditionsForAi = EXPEDITIONS.map(e => ({
        id: e.id,
        name: e.name,
        duration: e.duration,
        difficulty: e.difficulty,
        description: e.shortDescription,
    }));

    const prompt = `
        You are an expert expedition matchmaking AI for Mountain Challenger. Your task is to analyze a user's request and sort our list of expeditions based on how well they match.

        User's request: "${query}"

        Here is the list of available expeditions:
        ${JSON.stringify(expeditionsForAi)}

        Based on the user's request, return a JSON array of the expedition 'id' strings, ordered from the best match to the worst match. Your response MUST be ONLY the JSON array of strings.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                },
            },
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error getting AI-sorted expeditions:", error);
        throw new Error("Failed to get AI-powered recommendations.");
    }
};


/**
 * Generates an enhanced trip suggestion including text, a map, and images.
 * This function is an async generator that yields results as they become available.
 */
export async function* generateEnhancedTripPlan(
  duration: string,
  fitness: Difficulty,
  interests: string
): AsyncGenerator<PlanStreamResult> {
  
  const apiKey = getApiKey();
  if (!apiKey) {
    yield { type: 'error', data: "API key not found. Please add your key to the config.ts file or select one in the AI Studio environment." };
    return;
  }
  const ai = new GoogleGenAI({ apiKey });
  let textPlan = '';
  const expeditionsContext = EXPEDITIONS.map(exp => 
    `- ${exp.name}: Duration ${exp.duration} days, Difficulty ${exp.difficulty}, Description: ${exp.shortDescription}`
  ).join('\n');

  try {
    // === STEP 1: Generate the base text plan ===
    const textPrompt = `
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
    
    const textResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: textPrompt
    });
    textPlan = textResponse.text;
    yield { type: 'text', data: textPlan };

    // === STEP 2: Generate Alternative Itineraries ===
    const alternativeGenerationPrompt = `
        You are an expert tour guide for Mountain Challenger. A user received an initial recommendation, but you should now suggest 1 or 2 other excellent alternatives.

        User's original preferences:
        - Desired Trip Duration: Around ${duration} days
        - Fitness Level: ${fitness}
        - Primary Interests: ${interests}

        The main recommendation they already received was for a trip based on this plan:
        ---
        ${textPlan}
        ---

        Here is the full list of our available expeditions:
        ${expeditionsContext}

        Based on the user's preferences, suggest one or two DIFFERENT expeditions from the list that would also be great choices. For each alternative, provide a title (the expedition name) and a short, compelling description (1-2 sentences) explaining why it's a good alternative match.

        Your entire response MUST be a single JSON object. Do not suggest the same trip they already have.
    `;

    const alternativesResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: alternativeGenerationPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    alternatives: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.STRING }
                            },
                            required: ["title", "description"]
                        }
                    }
                },
                required: ["alternatives"]
            }
        }
    });

    const alternativesData = JSON.parse(alternativesResponse.text);
    if (alternativesData && alternativesData.alternatives.length > 0) {
        yield { type: 'alternatives', data: alternativesData.alternatives };
    }

    // === STEP 3: Generate Map Coordinates from the text plan ===
    const mapGenerationPrompt = `
        Based on the following trip plan, identify up to 7 key geographical locations mentioned (like cities, base camps, lakes, passes, or specific viewpoints). For each location, provide its name and its approximate latitude and longitude. Also, determine a suitable central latitude/longitude and zoom level for a map that would encompass all these points.

        Trip Plan:
        ---
        ${textPlan}
        ---

        Your entire response must be in a single JSON object. If you cannot identify any locations, return an empty array for "markers".
    `;
    
    const mapResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: mapGenerationPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    center: {
                        type: Type.OBJECT,
                        properties: { lat: { type: Type.NUMBER }, lng: { type: Type.NUMBER } },
                        required: ["lat", "lng"]
                    },
                    zoom: { type: Type.NUMBER },
                    markers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                lat: { type: Type.NUMBER },
                                lng: { type: Type.NUMBER }
                            },
                            required: ["name", "lat", "lng"]
                        }
                    }
                },
                required: ["center", "zoom", "markers"]
            }
        }
    });

    const mapData: MapData = JSON.parse(mapResponse.text);
    if (mapData && mapData.markers.length > 0) {
        yield { type: 'map', data: mapData };
    }


    // === STEP 4: Generate prompts for visuals based on the text plan ===
    const visualPromptGenerationPrompt = `
        Based on the following trip plan, create a set of visually descriptive prompts for an image generation AI. The prompts should capture the epic scale and beauty of the Karakoram mountains.

        Trip Plan:
        ---
        ${textPlan}
        ---

        Generate exactly two distinct prompts for photorealistic images. For each of these two images, also provide a short, engaging title and a one-sentence description. The titles should be specific locations or concepts from the trip plan (e.g., 'Fairy Meadows at Dawn', 'Crossing the Baltoro Glacier').

        Your entire response must be in a single JSON object.
    `;

    const visualPromptsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: visualPromptGenerationPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    imageDetails: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.STRING },
                                prompt: { type: Type.STRING }
                            },
                            required: ["title", "description", "prompt"]
                        },
                        description: 'An array of exactly 2 objects, each containing a title, description, and a detailed prompt for a still image.'
                    }
                },
                required: ["imageDetails"],
            }
        }
    });
    
    const visualPrompts = JSON.parse(visualPromptsResponse.text);
    const { imageDetails } = visualPrompts;

    // === STEP 5: Generate Images ===
    const imageResponse = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: imageDetails.map((d: any) => d.prompt).join('; '),
        config: {
          numberOfImages: 2,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    const detailedImages: ImageDetail[] = imageResponse.generatedImages.map((img, index) => ({
      url: `data:image/jpeg;base64,${img.image.imageBytes}`,
      title: imageDetails[index]?.title || 'Generated Image',
      description: imageDetails[index]?.description || 'A stunning view from the trip.',
    }));
    yield { type: 'images', data: detailedImages };

  } catch (error: any) {
    console.error("Error in AI generation process:", error);
    yield { type: 'error', data: `An error occurred during generation: ${error.message}` };
  }
};


/**
 * Generates a dream itinerary with text and a visual.
 */
export async function* generateDreamItinerary(
    dream: string
): AsyncGenerator<DreamStreamResult> {
    const apiKey = getApiKey();
    if (!apiKey) {
        yield { type: 'error', data: "API key is required for this feature." };
        return;
    }
    const ai = new GoogleGenAI({ apiKey });
    let generatedText = '';

    try {
        // Step 1: Generate the text itinerary
        const textPrompt = `
            You are a creative tour designer for Mountain Challenger. A user wants to visualize their dream trip.
            User's dream: "${dream}"
            Based on this, create a short, inspiring 3-day "taste-of" itinerary in Gilgit-Baltistan that captures this feeling.
            Format it nicely. Start with a creative title for the trip (e.g., "The Whispering Peaks of Hunza"). For each day, provide a title and a 2-sentence description.
            Your tone should be adventurous and magical.
        `;
        const textResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: textPrompt
        });
        generatedText = textResponse.text;
        yield { type: 'text', data: generatedText };

        // Step 2: Generate an image prompt from the text
        const imagePromptGeneratorPrompt = `
            You are an expert prompt engineer for an AI image generator. Create a single, detailed prompt for a photorealistic, cinematic "movie poster".
            The poster is for a dream adventure trip in the Karakoram mountains of Pakistan.
            The overall theme and feeling should be based on this user's dream: "${dream}".
            The itinerary for the trip is as follows:
            ---
            ${generatedText}
            ---
            Combine the user's dream and the key scenes from the itinerary to create a visually rich and evocative prompt. Include details about lighting (e.g., golden hour, misty dawn), composition, mood, and style (e.g., cinematic, epic, dramatic). The prompt must be a single, concise paragraph.
        `;
        const imagePromptResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: imagePromptGeneratorPrompt,
        });
        const imagePrompt = imagePromptResponse.text;
        
        // Step 3: Generate the image
        const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: imagePrompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '3:4', // Portrait for a poster-like feel
            },
        });

        const imageUrl = `data:image/jpeg;base64,${imageResponse.generatedImages[0].image.imageBytes}`;
        yield { type: 'image', data: { url: imageUrl, title: generatedText.split('\n')[0] } };

    } catch (error: any) {
        console.error("Error generating dream itinerary:", error);
        yield { type: 'error', data: `An error occurred: ${error.message}` };
    }
}

/**
 * Generates a personalized packing list for an expedition.
 */
export const generatePackingList = async (
    expeditionId: string,
    season: string,
    preferences: string
): Promise<PackingList> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const expedition = EXPEDITIONS.find(e => e.id === expeditionId);
    if (!expedition) {
        throw new Error("Expedition not found.");
    }

    const prompt = `
        You are an expert packing advisor for high-altitude treks in the Karakoram. A user needs a packing list.
        - Expedition: ${expedition.name} (Duration: ${expedition.duration} days, Difficulty: ${expedition.difficulty})
        - Season: ${season}
        - User's personal notes: "${preferences || 'None'}"

        Generate a comprehensive, categorized packing list for this specific trip, season, and user preference.
        Your response must be a JSON object that adheres to the provided schema.
        For each item, provide a brief, helpful note. Adjust recommendations based on the user's notes (e.g., add extra warm layers if they get cold easily, or suggest specific camera gear if they mention photography).
        The quantity should be a string to allow for "1 pair", "2-3", etc.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        packingList: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    categoryName: { type: Type.STRING },
                                    items: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                itemName: { type: Type.STRING },
                                                quantity: { type: Type.STRING },
                                                notes: { type: Type.STRING }
                                            },
                                            required: ["itemName", "quantity", "notes"]
                                        }
                                    }
                                },
                                required: ["categoryName", "items"]
                            }
                        }
                    },
                    required: ["packingList"]
                }
            }
        });

        return JSON.parse(response.text) as PackingList;
    } catch (error) {
        console.error("Error generating packing list:", error);
        throw new Error("Failed to generate AI packing list.");
    }
};

/**
 * Answers a user's open-ended question by acting as an expert guide.
 */
export const askExpertGuide = async (question: string): Promise<string> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API key not found.");
    }
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
        You are an expert, friendly, and safety-conscious local guide for Mountain Challenger, a premier trekking company in Gilgit-Baltistan, Pakistan. 
        Your name is 'Askari'. You provide detailed, thoughtful, and practical answers to trekkers' questions. 
        You have deep knowledge of the local culture, geography, safety protocols, and trekking techniques. 
        Answer the user's question clearly and encouragingly. Use formatting like paragraphs and bullet points for readability.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error asking expert guide:", error);
        throw new Error("Failed to get a response from our AI guide.");
    }
};