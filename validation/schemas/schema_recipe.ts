import Joi from "joi";

export const findRecipeRequestSchema = Joi.object({
	email: Joi.array().items(Joi.string()).required(),
});
