import Joi from "joi";

const coordinatesSchema = Joi.object({
	latitude: Joi.number().required(),
	longitude: Joi.number().required(),
});

export const newFridgeRequestSchema = Joi.object({
	name: Joi.string().required(),
	location: coordinatesSchema.required(),
});
