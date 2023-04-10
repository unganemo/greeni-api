import { NewShoppingListRequest } from "../interfaces/interface_shopping_list";
import { new_shopping_list_l } from "../logic/logic_shopping_list";

export const new_shopping_list_s = async (request: NewShoppingListRequest) => {
	return await new_shopping_list_l(request);
};
