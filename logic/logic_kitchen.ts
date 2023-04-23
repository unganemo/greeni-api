import {
  new_kitchen_c,
  invite_user_to_kitchen_c,
  accept_invite_to_kitchen_c,
  get_kitchen_content_c,
} from "../cache/cache_kitchen";
import { Groceries, Grocery } from "../interfaces/interface_grocery";
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
  const response = await get_kitchen_content_c(request);
  if (response !== undefined) {
    const today = new Date();
    const expiring_soonThreshold = new Date();
    expiring_soonThreshold.setDate(expiring_soonThreshold.getDate() + 2);
    for (const kitchen of response) {
      const expiring_soon = [];
      const expired = [];
      const not_expired = [];
      const { groceries } = kitchen;

      for (const item of groceries) {
        const expires = new Date(item.expires);

        if (expires < today) {
          expired.push(item);
        } else if (expires <= expiring_soonThreshold) {
          expiring_soon.push(item);
        } else {
          not_expired.push(item);
        }
      }

      const sortedGroceries = [expiring_soon, not_expired, expired];
      kitchen.groceries = sortedGroceries;
      expiring_soon;
    }

    return response;
  } else {
    return response;
  }
};
