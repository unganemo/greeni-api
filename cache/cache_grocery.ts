import { new_grocery_d } from "../database/database_grocery";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

export const new_grocery_c = async (request: NewGroceryRequest) => {
	return await new_grocery_d(request);
};
