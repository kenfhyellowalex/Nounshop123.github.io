import { GoogleGenAI } from "@google/genai";
import { AIPrediction, Product, Order } from "../types";

// Helper to initialize Gemini client safely
const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBusinessInsights = async (
  predictions: AIPrediction[],
  topProducts: Product[],
  recentOrders: Order[]
): Promise<string> => {
  const client = getGeminiClient();
  if (!client) {
    return "API Key missing. Cannot generate AI insights. Please ensure process.env.API_KEY is set.";
  }

  // Prepare context data
  const contextData = {
    salesTrend: predictions.map(p => ({ date: p.date, predicted: p.predicted_sales, actual: p.actual_sales || 'N/A' })),
    inventorySnapshot: topProducts.map(p => ({ name: p.name, stock: p.stock })),
    recentOrderCount: recentOrders.length
  };

  const prompt = `
    You are an expert business analyst AI for a retail CRM called Noun CRM.
    Analyze the following data JSON:
    ${JSON.stringify(contextData)}

    Please provide a concise 3-bullet point executive summary.
    1. Analyze the sales trend (Actual vs Predicted).
    2. Identify any inventory risks based on stock levels.
    3. Suggest a marketing action based on the data.
    
    Keep the tone professional and actionable.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to retrieve AI insights at this time.";
  }
};
