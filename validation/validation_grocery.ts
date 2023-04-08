import { NewGroceryRequest } from "../interfaces/interface_grocery";
import { new_grocery_s } from "../security/security_grocery";
import { newGroceryRequestSchema } from "./schemas/schema_grocery";

export const new_grocery_v = async (request: any) => {
	const { error, value } = newGroceryRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return `Invalid request: ${error.message}`;
	}
	const request_validated: NewGroceryRequest = value;
	return await new_grocery_s(request_validated);
};
