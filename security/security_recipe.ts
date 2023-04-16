import { FindRecipeRequest } from "../interfaces/interface_recipe";
import {
  find_recipe_v,
  create_recipe_v,
  save_recipe_v,
  find_recipes_by_kitchen_v,
  find_recipes_by_groceries_v,
} from "../validation/validation_recipe";
import { checkJwt } from "./utils";

export const find_recipe_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await find_recipe_v(request);
  else return 401;
};

export const create_recipe_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await create_recipe_v(request.body);
  else return 401;
};

export const save_recipe_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await save_recipe_v(request.body);
  else return 401;
};

export const find_recipes_by_kitchen_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await find_recipes_by_kitchen_v(request.params.id);
  else return 401;
};

export const find_recipes_by_groceries_s = async (
  request: any,
  ids: string[]
) => {
  if (checkJwt(request.headers.authorization))
    return await find_recipes_by_groceries_v(ids);
  else return 401;
};
