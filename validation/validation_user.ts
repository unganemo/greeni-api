import { sign_up_s, login_s } from "../security/security_user";
import { SignUpRequest, LoginRequest } from "../interfaces/interface_user";
import { signUpRequestSchema, loginRequestSchema } from "./schemas/schema_user";

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
