import Joi from "joi";

export const newShoppingListRequestSchema = Joi.object({
	user_id: Joi.string().required(),
	name: Joi.string().required(),
});
