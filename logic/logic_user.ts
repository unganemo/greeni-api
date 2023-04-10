import { sign_up_c, login_c, get_fridge_invites_c } from "../cache/cache_user";
import { LoginRequest, SignUpRequest } from "../interfaces/interface_user";
import { get_hash } from "./utils";
import bcrypt from "bcrypt";

export const sign_up_l = async (request: SignUpRequest) => {
	const hashed_password = await get_hash(request.password);
	request.password = hashed_password;
	return await sign_up_c(request);
};

export const login_l = async (request: LoginRequest) => {
	const result = await login_c(request);
	const db_password = result?.password ?? null;
	if (!db_password) return false;

	const isPasswordValid = await bcrypt.compare(request.password, db_password);

	if (isPasswordValid) {
		return result;
	}

	return null;
};

export const get_fridge_invites_l = async (request: string) => {
	return await get_fridge_invites_c(request);
};
