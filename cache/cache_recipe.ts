import { FindRecipeRequest } from "../interfaces/interface_recipe";
import { find_recipe_d } from "../database/database_recipe";

export const find_recipe_c = async (request: FindRecipeRequest) => {
	return await find_recipe_d(request);
};
