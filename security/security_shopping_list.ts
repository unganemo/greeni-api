import {
  new_shopping_list_v,
  add_item_to_shoppinglist_v,
} from "../validation/validation_shopping_list";
import { checkJwt } from "./utils";

export const new_shopping_list_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await new_shopping_list_v(request.body);
  else return 401;
};

export const add_item_to_shoppinglist_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await add_item_to_shoppinglist_v({
      sl_id: request.params.sl_id,
      groceries: request.body.groceries,
    });
  else return 401;
};
