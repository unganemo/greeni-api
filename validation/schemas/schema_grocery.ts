import Joi from "joi";

export const newGroceryRequestSchema = Joi.object({
  name: Joi.string().required(),
  days: Joi.number().required(),
});

export const deleteGroceryRequestSchema = Joi.object({
  kitchen_id: Joi.string().required(),
  grocery_id: Joi.string().required(),
});
