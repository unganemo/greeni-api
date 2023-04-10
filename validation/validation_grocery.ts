import {
	NewGroceryRequest,
	AddGroceryToFridgeRequest,
} from "../interfaces/interface_grocery";
import {
	new_grocery_s,
	add_grocery_to_fridge_s,
	get_all_groceries_s,
} from "../security/security_grocery";
import { addGroceryToFridgeRequestSchema } from "./schemas/schema_fridge";
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

export const add_grocery_to_fridge_v = async (request: any) => {
	const { error, value } = addGroceryToFridgeRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return `Invalid request: ${error.message}`;
	}
	const request_validated: AddGroceryToFridgeRequest = value;
	return await add_grocery_to_fridge_s(request_validated);
};

export const get_all_groceries_v = async () => {
	return await get_all_groceries_s();
};
