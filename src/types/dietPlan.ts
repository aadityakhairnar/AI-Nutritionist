export interface PersonalInfo {
    name: string;
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    target_weight_kg: number;
  }
  
  export interface DietaryPreferences {
    type: string;
    allergies: string[];
    restrictions: string[];
  }
  
  export interface MacronutrientBreakdown {
    proteins_g: number;
    carbohydrates_g: number;
    fats_g: number;
  }
  
  export interface MealPlanItem {
    meal: string;
    calories: number;
    proteins_g: number;
    carbohydrates_g: number;
    fats_g: number;
  }
  
  export interface MealPlan {
    breakfast: MealPlanItem;
    lunch: MealPlanItem;
    dinner: MealPlanItem;
    snacks: MealPlanItem;
  }
  
  export interface ProgressTracking {
    current_weight_kg: number;
    target_weight_kg: number;
    weeks_to_goal: number;
    weekly_weight_loss_kg: number;
  }
  
  export interface ExerciseRecommendation {
    type: string;
    duration_minutes: number;
    frequency_per_week: number;
  }
  
  export interface DietPlan {
    personal_info: PersonalInfo;
    activity_level: string;
    dietary_preferences: DietaryPreferences;
    health_conditions: string[];
    daily_calorie_intake: number;
    macronutrient_breakdown: MacronutrientBreakdown;
    meal_plan: MealPlan;
    water_intake_liters: number;
    progress_tracking: ProgressTracking;
    exercise_recommendations: ExerciseRecommendation[];
  }
  