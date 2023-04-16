import Joi from "joi";
import { TokenError } from "../interfaces/interface_error";
import {
  AcceptInviteToKitchenRequest,
  InviteUserToKitchenRequest,
  NewKitchenRequest,
} from "../interfaces/interface_kitchen";
import {
  new_kitchen_l,
  invite_user_to_kitchen_l,
  accept_invite_to_kitchen_l,
  get_kitchen_content_l,
} from "../logic/logic_kitchen";
import {
  inviteUserToKitchenRequestSchema,
  newKitchenRequestSchema,
  acceptInviteToKitchenRequestSchema,
} from "./schemas/schema_kitchen";

export const new_kitchen_v = async (
  request: any
): Promise<any | TokenError> => {
  const { error, value } = newKitchenRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return { status: 400 };
  }
  const request_validated: NewKitchenRequest = value;
  return await new_kitchen_l(request_validated);
};

export const invite_user_to_kitchen_v = async (
  request: any
): Promise<any | TokenError> => {
  const { error, value } = inviteUserToKitchenRequestSchema.validate(request, {
    abortEarly: false,
  });
  if (error) {
    return { status: 400 };
  }
  const request_validated: InviteUserToKitchenRequest = value;
  return await invite_user_to_kitchen_l(request_validated);
};

export const accept_invite_to_kitchen_v = async (
  request: any
): Promise<any | TokenError> => {
  const { error, value } = acceptInviteToKitchenRequestSchema.validate(
    request,
    {
      abortEarly: false,
    }
  );
  if (error) {
    return { status: 400 };
  }
  const request_validated: AcceptInviteToKitchenRequest = value;
  return await accept_invite_to_kitchen_l(request_validated);
};

export const get_kitchen_content_v = async (request: any) => {
  const schema = Joi.string();
  const result = schema.validate(request);
  console.log(request);
  if (result !== null) return await get_kitchen_content_l(request);
  else return { status: 400 };
};
