import {
  new_kitchen_v,
  invite_user_to_kitchen_v,
  accept_invite_to_kitchen_v,
  get_kitchen_content_v,
} from "../validation/validation_kitchen";
import { checkJwt } from "./utils";

export const new_kitchen_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await new_kitchen_v(request);
  else return 401;
};

export const invite_user_to_kitchen_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await invite_user_to_kitchen_v(request);
  else return 401;
};

export const accept_invite_to_kitchen_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await accept_invite_to_kitchen_v(request);
  else return 401;
};

export const get_kitchen_content_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await get_kitchen_content_v(request.params.id);
  else return 401;
};
