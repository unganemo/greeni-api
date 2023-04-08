import { NewGroceryRequest } from "../interfaces/interface_grocery";
import { new_grocery_l } from "../logic/logic_grocery";

export const new_grocery_s = async (request: NewGroceryRequest) => {
	return await new_grocery_l(request);
};
