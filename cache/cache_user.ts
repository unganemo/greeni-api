import {
	sign_up_d,
	get_user_by_email,
	get_fridge_invites_d,
} from "../database/database_user";
import { LoginRequest, SignUpRequest } from "../interfaces/interface_user";

export const sign_up_c = async (request: SignUpRequest) => {
	return await sign_up_d(request);
};

export const login_c = async (request: LoginRequest) => {
	return await get_user_by_email(request.email);
};

export const get_fridge_invites_c = async (request: string) => {
	return await get_fridge_invites_d(request);
};
