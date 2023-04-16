import {
  CreateRecipeRequest,
  FindRecipeRequest,
  SaveRecipeRequest,
} from "../interfaces/interface_recipe";
import {
  find_recipe_c,
  create_recipe_c,
  save_recipe_c,
  find_recipes_by_kitchen_c,
  find_recipes_by_groceries_c,
} from "../cache/cache_recipe";

export const find_recipe_l = async (request: FindRecipeRequest) => {
  return await find_recipe_c(request);
};

export const create_recipe_l = async (request: CreateRecipeRequest) => {
  return await create_recipe_c(request);
};

export const save_recipe_l = async (request: SaveRecipeRequest) => {
  return await save_recipe_c(request);
};

export const find_recipes_by_kitchen_l = async (request: string) => {
  return await find_recipes_by_kitchen_c(request);
};

export const find_recipes_by_groceries_l = async (request: string[]) => {
  return await find_recipes_by_groceries_c(request);
};
