import Joi from "joi";

export const newShoppingListRequestSchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
});

export const addItemToShoppingListRequestSchema = Joi.object({
  sl_id: Joi.string().required(),
  groceries: Joi.array().items(Joi.string()),
});
