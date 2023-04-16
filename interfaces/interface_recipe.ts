export interface FindRecipeRequest {
  groceries: string[];
}

interface Instruction {
  step: string;
  timer: boolean;
}

interface Ingridient {
  g_id: string;
  amount?: number;
  unit?: string;
}

type Difficulty = "beginner" | "easy" | "medium" | "hard" | "advanced";

export interface CreateRecipeRequest {
  title: string;
  ingridients: Ingridient[];
  instructions: Instruction[];
  time: number;
  img: string;
  difficulty: Difficulty;
}

export interface SaveRecipeRequest {
  user_id: string;
  recipe_id: string;
}
