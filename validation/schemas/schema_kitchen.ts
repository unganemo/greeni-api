import Joi, { number, string } from "joi";

const coordinatesSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export const newKitchenRequestSchema = Joi.object({
  name: Joi.string().required(),
  location: coordinatesSchema.required(),
  user_id: Joi.string().required(),
});

export const addGroceryToKitchenRequestSchema = Joi.object({
  kitchen_id: Joi.string().required(),
  grocery_id: Joi.string(),
  grocery_name: Joi.string(),
  expires: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  purchased: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
});

export const inviteUserToKitchenRequestSchema = Joi.object({
  kitchen_id: Joi.string().required(),
  owner_id: Joi.string().required(),
  invitee_email: Joi.string().required(),
});

export const acceptInviteToKitchenRequestSchema = Joi.object({
  owner_id: Joi.string().required(),
  invited_id: Joi.string().required(),
  kitchen_id: Joi.string().required(),
  name: Joi.string().required(),
});
