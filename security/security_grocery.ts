import {
	NewGroceryRequest,
	AddGroceryToFridgeRequest,
} from "../interfaces/interface_grocery";
import { new_grocery_l, add_grocery_to_fridge_l } from "../logic/logic_grocery";

export const new_grocery_s = async (request: NewGroceryRequest) => {
	return await new_grocery_l(request);
};

export const add_grocery_to_fridge_s = async (
	request: AddGroceryToFridgeRequest
) => {
	return await add_grocery_to_fridge_l(request);
};
