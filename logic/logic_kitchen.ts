import {
  new_kitchen_c,
  invite_user_to_kitchen_c,
  accept_invite_to_kitchen_c,
  get_kitchen_content_c,
} from "../cache/cache_kitchen";
import {
  AcceptInviteToKitchenRequest,
  InviteUserToKitchenRequest,
  NewKitchenRequest,
} from "../interfaces/interface_kitchen";

export const new_kitchen_l = async (request: NewKitchenRequest) => {
  return await new_kitchen_c(request);
};

export const invite_user_to_kitchen_l = async (
  request: InviteUserToKitchenRequest
) => {
  return await invite_user_to_kitchen_c(request);
};

export const accept_invite_to_kitchen_l = async (
  request: AcceptInviteToKitchenRequest
) => {
  return await accept_invite_to_kitchen_c(request);
};

export const get_kitchen_content_l = async (request: string) => {
  return await get_kitchen_content_c(request);
};
