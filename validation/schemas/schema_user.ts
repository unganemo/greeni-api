import Joi from "joi";

export const signUpRequestSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
});

export const loginRequestSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
