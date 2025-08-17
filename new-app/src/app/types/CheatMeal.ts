export interface Meal {
  strMeal: string;
  strMealThumb: string;
}

export interface MealDBResponse {
  meals: Meal[];
}
