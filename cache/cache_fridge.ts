import {
	new_fridge_d,
	invite_user_to_fridge_d,
	accept_invite_to_fridge_d,
	get_fridge_content_d,
} from "../database/database_fridge";
import {
	AcceptInviteToFridgeRequest,
	InviteUserToFridgeRequest,
	NewFridgeRequest,
} from "../interfaces/interface_fridge";

export const new_fridge_c = async (request: NewFridgeRequest) => {
	return await new_fridge_d(request);
};

export const invite_user_to_fridge_c = async (
	request: InviteUserToFridgeRequest
) => {
	return await invite_user_to_fridge_d(request);
};

export const accept_invite_to_fridge_c = async (
	request: AcceptInviteToFridgeRequest
) => {
	return await accept_invite_to_fridge_d(request);
};

export const get_fridge_content_c = async (request: string) => {
	return await get_fridge_content_d(request);
};
