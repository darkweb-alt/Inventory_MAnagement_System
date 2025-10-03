
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateDescription(itemName: string, userNotes: string): Promise<string> {
  const prompt = `
    Generate a compelling, short, and enticing rental description for the following item. 
    Be creative and highlight its potential uses. The description should be a single paragraph, maximum 3 sentences.
    Do not use markdown or lists.
    
    Item Name: "${itemName}"
    User's notes: "${userNotes}"

    Rental Description:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "A versatile and useful item ready for your next project or adventure!";
  }
}
