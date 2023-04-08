import { FindRecipeRequest } from "../interfaces/interface_recipe";
import { findRecipeRequestSchema } from "./schemas/schema_recipe";
import { find_recipe_s } from "../security/security_recipe";

export const find_recipe_v = async (request: any) => {
	const { error, value } = findRecipeRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return `Invalid request: ${error.message}`;
	}
	const request_validated: FindRecipeRequest = value;
	return await find_recipe_s(request_validated);
};
