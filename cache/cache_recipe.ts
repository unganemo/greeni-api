import {
  CreateRecipeRequest,
  FindRecipeRequest,
  SaveRecipeRequest,
} from "../interfaces/interface_recipe";
import {
  find_recipe_d,
  create_recipe_d,
  save_recipe_d,
  find_recipes_by_kitchen_d,
  find_recipes_by_groceries_d,
} from "../database/database_recipe";

export const find_recipe_c = async (request: FindRecipeRequest) => {
  return await find_recipe_d(request);
};

export const create_recipe_c = async (request: CreateRecipeRequest) => {
  return await create_recipe_d(request);
};

export const save_recipe_c = async (request: SaveRecipeRequest) => {
  return await save_recipe_d(request);
};

export const find_recipes_by_kitchen_c = async (request: string) => {
  return await find_recipes_by_kitchen_d(request);
};

export const find_recipes_by_groceries_c = async (request: string[]) => {
  return await find_recipes_by_groceries_d(request);
};
