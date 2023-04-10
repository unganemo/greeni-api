import {
	sign_up_s,
	login_s,
	get_fridge_invites_s,
} from "../security/security_user";
import { SignUpRequest, LoginRequest } from "../interfaces/interface_user";
import { signUpRequestSchema, loginRequestSchema } from "./schemas/schema_user";
import Joi from "joi";

export const sign_up_v = async (request: any) => {
	const { error, value } = signUpRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		throw new Error(`Invalid sign-up request: ${error.message}`);
	}
	const request_validated: SignUpRequest = value;
	return await sign_up_s(request_validated);
};

export const login_v = async (request: any) => {
	const { error, value } = loginRequestSchema.validate(request, {
		abortEarly: false,
	});
	if (error) {
		throw new Error(`Invalid login request: ${error.message}`);
	}
	const request_validated: LoginRequest = value;
	return await login_s(request_validated);
};

export const get_fridge_invites_v = async (request: any) => {
	const schema = Joi.string();
	const result = schema.validate(request);
	if (result !== null) return await get_fridge_invites_s(request);
	else return { status: 400 };
};
