import { NewShoppingListRequest } from "../interfaces/interface_shopping_list";
import { new_shopping_list_d } from "../database/database_shopping_list";

export const new_shopping_list_l = async (request: NewShoppingListRequest) => {
	return await new_shopping_list_d(request);
};
