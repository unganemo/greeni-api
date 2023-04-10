import { NewShoppingListRequest } from "../interfaces/interface_shopping_list";
import { new_shopping_list_s } from "../security/security_shopping_list";
import { newShoppingListRequestSchema } from "./schemas/schema_shopping_list";

export const new_shopping_list_v = async (request: any) => {
	const { error, value } = newShoppingListRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return `Invalid request: ${error.message}`;
	}
	const request_validated: NewShoppingListRequest = value;
	return await new_shopping_list_s(request_validated);
};
