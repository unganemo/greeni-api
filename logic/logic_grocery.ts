import {
	new_grocery_c,
	add_grocery_to_fridge_c,
	get_all_groceries_c,
} from "../cache/cache_grocery";
import { AddGroceryToFridgeRequest } from "../interfaces/interface_grocery";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

export const new_grocery_l = async (request: NewGroceryRequest) => {
	return await new_grocery_c(request);
};

export const add_grocery_to_fridge_l = async (
	request: AddGroceryToFridgeRequest
) => {
	return await add_grocery_to_fridge_c(request);
};

export const get_all_groceries_l = async () => {
	return await get_all_groceries_c();
};
