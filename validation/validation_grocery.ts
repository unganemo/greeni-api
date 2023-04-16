import Joi from "joi";
import {
  NewGroceryRequest,
  AddGroceryToKitchenRequest,
} from "../interfaces/interface_grocery";
import {
  new_grocery_l,
  add_grocery_to_kitchen_l,
  get_all_groceries_l,
  get_grocery_by_name_l,
} from "../logic/logic_grocery";
import { addGroceryToKitchenRequestSchema } from "./schemas/schema_kitchen";
import { newGroceryRequestSchema } from "./schemas/schema_grocery";

export const new_grocery_v = async (request: any) => {
  const { error, value } = newGroceryRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: NewGroceryRequest = value;
  return await new_grocery_l(request_validated);
};

export const add_grocery_to_kitchen_v = async (request: any) => {
  const { error, value } = addGroceryToKitchenRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return `Invalid request: ${error.message}`;
  }
  const request_validated: AddGroceryToKitchenRequest = value;
  return await add_grocery_to_kitchen_l(request_validated);
};

export const get_all_groceries_v = async () => {
  return await get_all_groceries_l();
};

export const get_grocery_by_name_v = async (request: any) => {
  const schema = Joi.string();
  const result = schema.validate(request);
  if (result !== null) return await get_grocery_by_name_l(request);
  else return { status: 400 };
};
