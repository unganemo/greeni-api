import {
	new_grocery_v,
	add_grocery_to_kitchen_v,
	get_all_groceries_v,
	get_grocery_by_name_v,
	delete_grocery_from_kitchen_v,
} from "../validation/validation_grocery";
import { checkJwt } from "./utils";

export const new_grocery_s = async (request: any) => {
	if (checkJwt(request.headers.authorization))
		return await new_grocery_v(request.body);
	else return 401;
};

export const add_grocery_to_kitchen_s = async (request: any) => {
	if (checkJwt(request.headers.authorization))
		return await add_grocery_to_kitchen_v(request.body);
	else return 401;
};

export const get_all_groceries_s = async (request: any) => {
	if (checkJwt(request.headers.authorization))
		return await get_all_groceries_v();
	else return 401;
};

export const get_grocery_by_name_s = async (request: any) => {
	if (checkJwt(request.headers.authorization))
		return await get_grocery_by_name_v(request.params.search);
	else return 401;
};

export const delete_grocery_from_kitchen_s = async (request: any) => {
	if (checkJwt(request.headers.authorization))
		return await delete_grocery_from_kitchen_v(request.params.has_id);
	else return 401;
};
