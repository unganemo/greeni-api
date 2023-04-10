import {
	new_fridge_c,
	invite_user_to_fridge_c,
	accept_invite_to_fridge_c,
	get_fridge_content_c,
} from "../cache/cache_fridge";
import {
	AcceptInviteToFridgeRequest,
	InviteUserToFridgeRequest,
	NewFridgeRequest,
} from "../interfaces/interface_fridge";

export const new_fridge_l = async (request: NewFridgeRequest) => {
	return await new_fridge_c(request);
};

export const invite_user_to_fridge_l = async (
	request: InviteUserToFridgeRequest
) => {
	return await invite_user_to_fridge_c(request);
};

export const accept_invite_to_fridge_l = async (
	request: AcceptInviteToFridgeRequest
) => {
	return await accept_invite_to_fridge_c(request);
};

export const get_fridge_content_l = async (request: string) => {
	return await get_fridge_content_c(request);
};
