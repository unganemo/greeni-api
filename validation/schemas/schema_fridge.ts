import Joi, { number, string } from "joi";

const coordinatesSchema = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
});

export const newFridgeRequestSchema = Joi.object({
	name: Joi.string().required(),
	location: coordinatesSchema.required(),
	user_id: Joi.string().required(),
});

export const addGroceryToFridgeRequestSchema = Joi.object({
	fridge_id: Joi.string().required(),
	grocery_id: Joi.string(),
	grocery_name: Joi.string(),
	expires: Joi.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.required(),
	purchased: Joi.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/)
		.required(),
});

export const inviteUserToFridgeRequestSchema = Joi.object({
	fridge_id: Joi.string().required(),
	owner_id: Joi.string().required(),
	invitee_email: Joi.string().required(),
});

export const acceptInviteToFridgeRequestSchema = Joi.object({
	owner_id: Joi.string().required(),
	invited_id: Joi.string().required(),
	fridge_id: Joi.string().required(),
	name: Joi.string().required(),
});
