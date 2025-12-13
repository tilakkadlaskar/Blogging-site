import { GoogleGenAI } from "@google/genai";
import { BlogPost } from "../types";

// Note: In a real production app, ensure API keys are handled securely.
// For this generated static site code, we use process.env.API_KEY as requested.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askResearchAssistant = async (
  question: string,
  currentPost: BlogPost | null
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    let context = "";
    if (currentPost) {
      context = `
      CONTEXT:
      You are an AI Research Assistant for the blog "Research Notes".
      The user is currently reading a paper/post titled "${currentPost.title}".
      
      ABSTRACT:
      ${currentPost.abstract}
      
      CONTENT:
      ${currentPost.content.map(s => s.title ? `[${s.title}] ${s.content}` : s.content).join("\n")}
      
      INSTRUCTION:
      Answer the user's question based strictly on the context provided above and your general knowledge of mathematics/CS.
      Maintain a helpful, academic, yet accessible tone.
      If the user asks for a summary, summarize the provided content.
      If the user asks about something unrelated, politely steer them back to the research topic or answer briefly if it's a general math question.
      Keep the response concise (under 150 words) unless asked for a detailed derivation.
      `;
    } else {
      context = `
      CONTEXT:
      You are an AI Research Assistant for Tilak Kadlaskar's blog. The user is on the home page.
      
      INSTRUCTION:
      Answer general questions about AI, Mathematics, or Computer Science.
      Encourage the user to read one of the specific blog posts for detailed analysis.
      `;
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        {
          role: 'user',
          parts: [
            { text: context },
            { text: `Question: ${question}` }
          ]
        }
      ],
      config: {
        systemInstruction: "You are a specialized AI assistant for a technical blog. You speak like a helpful post-doc researcher.",
      }
    });

    return response.text || "I processed the thought, but could not articulate an answer.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered an error while consulting the neural weights. Please check your connection or API key.";
  }
};