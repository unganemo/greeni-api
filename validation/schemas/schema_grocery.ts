import Joi from "joi";

export const newGroceryRequestSchema = Joi.object({
	name: Joi.string().required(),
});
