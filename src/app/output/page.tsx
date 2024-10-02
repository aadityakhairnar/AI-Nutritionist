"use client";

import { useEffect, useState } from "react";
import { DietPlan } from "@/types/dietPlan";
// Import the defined DietPlan interface
export default function OutputPage() {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null); // Initialize the state with the DietPlan type

  useEffect(() => {
    const storedData = localStorage.getItem("dietPlanData");
    if (storedData) {
      const parsedData: DietPlan = JSON.parse(storedData); // Parse and set the dietPlan
      setDietPlan(parsedData);
    } else {
      console.error("No diet plan data found.");
    }
  }, []);

  if (!dietPlan) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Personalized Diet Plan</h1>

      <div className="mb-4">
        <h2 className="font-bold">Personal Information:</h2>
        <p>Age: {dietPlan.personal_info.age}</p>
        <p>Gender: {dietPlan.personal_info.gender}</p>
        <p>Height: {dietPlan.personal_info.height_cm} cm</p>
        <p>Weight: {dietPlan.personal_info.weight_kg} kg</p>
        <p>Target Weight: {dietPlan.personal_info.target_weight_kg} kg</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Activity Level:</h2>
        <p>{dietPlan.activity_level}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Dietary Preferences:</h2>
        <p>Type: {dietPlan.dietary_preferences.type}</p>
        <p>Allergies: {dietPlan.dietary_preferences.allergies.join(", ")}</p>
        <p>Restrictions: {dietPlan.dietary_preferences.restrictions.join(", ")}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Daily Calorie Intake:</h2>
        <p>{dietPlan.daily_calorie_intake} kcal</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Macronutrient Breakdown:</h2>
        <p>Proteins: {dietPlan.macronutrient_breakdown.proteins_g} g</p>
        <p>Carbohydrates: {dietPlan.macronutrient_breakdown.carbohydrates_g} g</p>
        <p>Fats: {dietPlan.macronutrient_breakdown.fats_g} g</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Meal Plan:</h2>
        <p>
          <strong>Breakfast:</strong> {dietPlan.meal_plan.breakfast?.meal || "N/A"} 
          ({dietPlan.meal_plan.breakfast?.calories || "N/A"} kcal)
        </p>
        <p>
          <strong>Lunch:</strong> {dietPlan.meal_plan.lunch?.meal || "N/A"} 
          ({dietPlan.meal_plan.lunch?.calories || "N/A"} kcal)
        </p>
        <p>
          <strong>Dinner:</strong> {dietPlan.meal_plan.dinner?.meal || "N/A"} 
          ({dietPlan.meal_plan.dinner?.calories || "N/A"} kcal)
        </p>
        <p>
          <strong>Snacks:</strong> {dietPlan.meal_plan.snacks?.meal || "N/A"} 
          ({dietPlan.meal_plan.snacks?.calories || "N/A"} kcal)
        </p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Water Intake:</h2>
        <p>{dietPlan.water_intake_liters} liters/day</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Progress Tracking:</h2>
        <p>Current Weight: {dietPlan.progress_tracking.current_weight_kg} kg</p>
        <p>Target Weight: {dietPlan.progress_tracking.target_weight_kg} kg</p>
        <p>Weeks to Goal: {dietPlan.progress_tracking.weeks_to_goal}</p>
        <p>Weekly Weight Loss: {dietPlan.progress_tracking.weekly_weight_loss_kg} kg</p>
      </div>

      <div className="mb-4">
        <h2 className="font-bold">Exercise Recommendations:</h2>
        {dietPlan.exercise_recommendations.map((exercise, index) => (
          <div key={index} className="mb-2">
            <p><strong>Type:</strong> {exercise.type}</p>
            <p><strong>Duration:</strong> {exercise.duration_minutes} minutes</p>
            <p><strong>Frequency:</strong> {exercise.frequency_per_week} times/week</p>
          </div>
        ))}
      </div>
    </div>
  );
}
