import {
  CreateRecipeRequest,
  FindRecipeRequest,
  SaveRecipeRequest,
} from "../interfaces/interface_recipe";
import {
  createRecipeRequestSchema,
  findRecipeRequestSchema,
  saveRecipeRequestSchema,
} from "./schemas/schema_recipe";
import {
  find_recipe_l,
  create_recipe_l,
  save_recipe_l,
  find_recipes_by_kitchen_l,
  find_recipes_by_groceries_l,
} from "../logic/logic_recipe";
import Joi from "joi";

export const find_recipe_v = async (request: any) => {
  const { error, value } = findRecipeRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: FindRecipeRequest = value;
  return await find_recipe_l(request_validated);
};

export const create_recipe_v = async (request: any) => {
  const { error, value } = createRecipeRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: CreateRecipeRequest = value;
  return await create_recipe_l(request_validated);
};

export const save_recipe_v = async (request: any) => {
  const { error, value } = saveRecipeRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: SaveRecipeRequest = value;
  return await save_recipe_l(request_validated);
};

export const find_recipes_by_kitchen_v = async (request: any) => {
  const schema = Joi.string().required();
  const request_validated = schema.validate(request);
  if (request_validated !== null)
    return await find_recipes_by_kitchen_l(request);
  else return 400;
};

export const find_recipes_by_groceries_v = async (request: any) => {
  const schema = Joi.array().items(Joi.string()).required();
  const request_validated = schema.validate(request);
  if (request_validated !== null)
    return await find_recipes_by_groceries_l(request);
  else return 400;
};
