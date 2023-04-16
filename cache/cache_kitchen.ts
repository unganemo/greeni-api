import {
  new_kitchen_d,
  invite_user_to_kitchen_d,
  accept_invite_to_kitchen_d,
  get_kitchen_content_d,
} from "../database/database_kitchen";
import {
  AcceptInviteToKitchenRequest,
  InviteUserToKitchenRequest,
  NewKitchenRequest,
} from "../interfaces/interface_kitchen";

export const new_kitchen_c = async (request: NewKitchenRequest) => {
  return await new_kitchen_d(request);
};

export const invite_user_to_kitchen_c = async (
  request: InviteUserToKitchenRequest
) => {
  return await invite_user_to_kitchen_d(request);
};

export const accept_invite_to_kitchen_c = async (
  request: AcceptInviteToKitchenRequest
) => {
  return await accept_invite_to_kitchen_d(request);
};

export const get_kitchen_content_c = async (request: string) => {
  return await get_kitchen_content_d(request);
};
