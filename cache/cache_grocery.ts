import {
  new_grocery_d,
  get_all_groceries_d,
  add_grocery_to_kitchen_d,
  get_grocery_by_name_d,
  delete_grocery_from_kitchen_d,
} from "../database/database_grocery";
import {
  AddGroceryToKitchenRequest,
  DeleteGroceryRequest,
} from "../interfaces/interface_grocery";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

export const new_grocery_c = async (request: NewGroceryRequest) => {
  return await new_grocery_d(request);
};

export const delete_grocery_from_kitchen_c = async (
  request: DeleteGroceryRequest
) => {
  return await delete_grocery_from_kitchen_d(request);
};

export const add_grocery_to_kitchen_c = async (
  request: AddGroceryToKitchenRequest
) => {
  return await add_grocery_to_kitchen_d(request);
};

export const get_all_groceries_c = async () => {
  return await get_all_groceries_d();
};

export const get_grocery_by_name_c = async (request: string) => {
  return await get_grocery_by_name_d(request);
};
