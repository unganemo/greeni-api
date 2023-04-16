import {
  AddItemToShoppingListRequest,
  NewShoppingListRequest,
} from "../interfaces/interface_shopping_list";
import {
  new_shopping_list_l,
  add_item_to_shoppinglist_l,
} from "../logic/logic_shopping_list";
import {
  newShoppingListRequestSchema,
  addItemToShoppingListRequestSchema,
} from "./schemas/schema_shopping_list";

export const new_shopping_list_v = async (request: any) => {
  const { error, value } = newShoppingListRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: NewShoppingListRequest = value;
  return await new_shopping_list_l(request_validated);
};

export const add_item_to_shoppinglist_v = async (request: any) => {
  const { error, value } = addItemToShoppingListRequestSchema.validate(
    request,
    {
      abortEarly: false,
    }
  );
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: AddItemToShoppingListRequest = value;
  return await add_item_to_shoppinglist_l(request_validated);
};
