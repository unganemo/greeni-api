import {
	AcceptInviteToFridgeRequest,
	InviteUserToFridgeRequest,
	NewFridgeRequest,
} from "../interfaces/interface_fridge";
import {
	new_fridge_l,
	invite_user_to_fridge_l,
	accept_invite_to_fridge_l,
	get_fridge_content_l,
} from "../logic/logic_fridge";

export const new_fridge_s = async (request: NewFridgeRequest) => {
	return await new_fridge_l(request);
};

export const invite_user_to_fridge_s = async (
	request: InviteUserToFridgeRequest
) => {
	return await invite_user_to_fridge_l(request);
};

export const accept_invite_to_fridge_s = async (
	request: AcceptInviteToFridgeRequest
) => {
	return await accept_invite_to_fridge_l(request);
};

export const get_fridge_content_s = async (request: string) => {
	return await get_fridge_content_l(request);
};
