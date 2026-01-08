import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-3-pro-preview',
            history: history,
            config: {
                systemInstruction: "You are a helpful, efficient, and professional assistant for the Santalla Core ERP system. You help users with inventory, sales data, and general business questions.",
            }
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat generation error:", error);
        throw error;
    }
};

export const generateMarketingImage = async (prompt: string, size: '1K' | '2K' | '4K') => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: size
                }
            }
        });

        // Extract image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Image generation error:", error);
        throw error;
    }
};
