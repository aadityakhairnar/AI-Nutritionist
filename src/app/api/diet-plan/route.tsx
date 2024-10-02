import { NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Ensure API key is defined
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Define the schema for the expected response from Gemini API
const schema = {
  description: "Personalized Diet Plan",
  type: SchemaType.OBJECT,
  properties: {
    daily_calorie_intake: { type: SchemaType.NUMBER, description: "Daily calorie intake" },
    macronutrient_breakdown: {
      type: SchemaType.OBJECT,
      properties: {
        proteins_g: { type: SchemaType.NUMBER, description: "Proteins in grams" },
        carbohydrates_g: { type: SchemaType.NUMBER, description: "Carbohydrates in grams" },
        fats_g: { type: SchemaType.NUMBER, description: "Fats in grams" },
      },
    },
    meal_plan: {
      type: SchemaType.OBJECT,
      properties: {
        breakfast: {
          type: SchemaType.OBJECT,
          properties: {
            meal: { type: SchemaType.STRING, description: "Breakfast meal" },
            calories: { type: SchemaType.NUMBER, description: "Calories for breakfast" },
          },
        },
        lunch: {
          type: SchemaType.OBJECT,
          properties: {
            meal: { type: SchemaType.STRING, description: "Lunch meal" },
            calories: { type: SchemaType.NUMBER, description: "Calories for lunch" },
          },
        },
        dinner: {
          type: SchemaType.OBJECT,
          properties: {
            meal: { type: SchemaType.STRING, description: "Dinner meal" },
            calories: { type: SchemaType.NUMBER, description: "Calories for dinner" },
          },
        },
        snacks: {
          type: SchemaType.OBJECT,
          properties: {
            meal: { type: SchemaType.STRING, description: "Snack meal" },
            calories: { type: SchemaType.NUMBER, description: "Calories for snacks" },
          },
        },
      },
    },
    water_intake_liters: { type: SchemaType.NUMBER, description: "Water intake in liters" },
    progress_tracking: {
      type: SchemaType.OBJECT,
      properties: {
        current_weight_kg: { type: SchemaType.NUMBER, description: "Current weight" },
        target_weight_kg: { type: SchemaType.NUMBER, description: "Target weight" },
        weeks_to_goal: { type: SchemaType.NUMBER, description: "Weeks to reach goal" },
      },
    },
    exercise_recommendations: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          type: { type: SchemaType.STRING, description: "Exercise type" },
          duration_minutes: { type: SchemaType.NUMBER, description: "Duration in minutes" },
          frequency_per_week: { type: SchemaType.NUMBER, description: "Frequency per week" },
        },
      },
    },
  },
};

// Define the Gemini model with the response schema
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export async function POST(req: Request) {
  try {
    const {
      name,
      age,
      gender,
      height,
      weight,
      targetWeight,
      activityLevel,
      dietaryPreferences,
      dietaryRestrictions,
      healthConditions,
      timeframe,
    } = await req.json();

    // Generate the prompt for Gemini API
    const prompt = `Generate a personalized diet plan for a ${age}-year-old ${gender} weighing ${weight} kg, height ${height} cm, targeting ${targetWeight} kg. Activity level: "${activityLevel}", diet: ${dietaryPreferences}, health conditions: ${healthConditions}, restrictions: ${dietaryRestrictions}. Timeframe: ${timeframe}.`;

    // Make the request to Gemini API
    const result = await model.generateContent(prompt);

    // Log and return the response text
    if (result?.response?.text) {
      const geminiResponse = JSON.parse(result.response.text());

      // Combine Gemini response with user's personal information
      const combinedResponse = {
        personal_info: {
          name,
          age,
          gender,
          height_cm: height,
          weight_kg: weight,
          target_weight_kg: targetWeight,
        },
        activity_level: activityLevel,
        dietary_preferences: {
          type: dietaryPreferences,
          allergies: dietaryRestrictions ? dietaryRestrictions.split(",") : [],
          restrictions: healthConditions ? healthConditions.split(",") : [],
        },
        ...geminiResponse, // Merge Gemini response with user's info
      };

      return NextResponse.json(combinedResponse);
    } else {
      return NextResponse.json({ error: "No valid response from Gemini API" });
    }
  } catch (error) {
    console.error("Error generating diet plan:", error);
    return NextResponse.error();
  }
}
