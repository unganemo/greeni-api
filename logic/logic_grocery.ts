import {
  new_grocery_c,
  add_grocery_to_kitchen_c,
  get_all_groceries_c,
  get_grocery_by_name_c,
  delete_grocery_from_kitchen_c,
} from "../cache/cache_grocery";
import {
  AddGroceryToKitchenRequest,
  DeleteGroceryRequest,
  NewGroceryRequest,
} from "../interfaces/interface_grocery";

export const new_grocery_l = async (request: NewGroceryRequest) => {
  return await new_grocery_c(request);
};
export const delete_grocery_from_kitchen_l = async (
  request: DeleteGroceryRequest
) => {
  return await delete_grocery_from_kitchen_c(request);
};

export const add_grocery_to_kitchen_l = async (
  request: AddGroceryToKitchenRequest
) => {
  return await add_grocery_to_kitchen_c(request);
};

export const get_all_groceries_l = async () => {
  return await get_all_groceries_c();
};

export const get_grocery_by_name_l = async (request: string) => {
  return await get_grocery_by_name_c(request);
};
