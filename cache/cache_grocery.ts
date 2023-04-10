import {
	new_grocery_d,
	get_all_groceries_d,
	add_grocery_to_fridge_d,
} from "../database/database_grocery";
import { AddGroceryToFridgeRequest } from "../interfaces/interface_grocery";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

export const new_grocery_c = async (request: NewGroceryRequest) => {
	return await new_grocery_d(request);
};

export const add_grocery_to_fridge_c = async (
	request: AddGroceryToFridgeRequest
) => {
	return await add_grocery_to_fridge_d(request);
};

export const get_all_groceries_c = async () => {
	return await get_all_groceries_d();
};
