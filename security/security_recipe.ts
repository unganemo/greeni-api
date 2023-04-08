import { FindRecipeRequest } from "../interfaces/interface_recipe";
import { find_recipe_l } from "../logic/logic_recipe";

export const find_recipe_s = async (request: FindRecipeRequest) => {
	return await find_recipe_l(request);
};
