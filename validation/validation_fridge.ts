import Joi from "joi";
import { TokenError } from "../interfaces/interface_error";
import {
	AcceptInviteToFridgeRequest,
	InviteUserToFridgeRequest,
	NewFridgeRequest,
} from "../interfaces/interface_fridge";
import {
	new_fridge_s,
	invite_user_to_fridge_s,
	accept_invite_to_fridge_s,
	get_fridge_content_s,
} from "../security/security_fridge";
import {
	inviteUserToFridgeRequestSchema,
	newFridgeRequestSchema,
	acceptInviteToFridgeRequestSchema,
} from "./schemas/schema_fridge";

export const new_fridge_v = async (request: any): Promise<any | TokenError> => {
	const { error, value } = newFridgeRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return { status: 400 };
	}
	const request_validated: NewFridgeRequest = value;
	return await new_fridge_s(request_validated);
};

export const invite_user_to_fridge_v = async (
	request: any
): Promise<any | TokenError> => {
	const { error, value } = inviteUserToFridgeRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		return { status: 400 };
	}
	const request_validated: InviteUserToFridgeRequest = value;
	return await invite_user_to_fridge_s(request_validated);
};

export const accept_invite_to_fridge_v = async (
	request: any
): Promise<any | TokenError> => {
	const { error, value } = acceptInviteToFridgeRequestSchema.validate(
		request,
		{
			abortEarly: false,
		}
	);
	if (error) {
		return { status: 400 };
	}
	const request_validated: AcceptInviteToFridgeRequest = value;
	return await accept_invite_to_fridge_s(request_validated);
};

export const get_fridge_content_v = async (request: any) => {
	const schema = Joi.string();
	const result = schema.validate(request);
	if (result !== null) return await get_fridge_content_s(request);
	else return { status: 400 };
};
