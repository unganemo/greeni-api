import { FindRecipeRequest } from "../interfaces/interface_recipe";
import { find_recipe_c } from "../cache/cache_recipe";

export const find_recipe_l = async (request: FindRecipeRequest) => {
	return await find_recipe_c(request);
};
