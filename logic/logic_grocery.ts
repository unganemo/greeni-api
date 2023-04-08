import { new_grocery_c } from "../cache/cache_grocery";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

export const new_grocery_l = async (request: NewGroceryRequest) => {
	return await new_grocery_c(request);
};
