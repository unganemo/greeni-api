import { LoginRequest, SignUpRequest } from "../interfaces/interface_user";
import { sign_up_l, login_l } from "../logic/logic_user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Token } from "../interfaces/interface_user";
import { TokenError } from "../interfaces/interface_error";
dotenv.config();
const secret = process.env.JWT_SECRET || "default_secret";

export const sign_up_s = async (body: SignUpRequest) => {
	return await sign_up_l(body);
};

export const login_s = async (
	body: LoginRequest
): Promise<Token | TokenError> => {
	const result = await login_l(body);
	if (result != null) {
		const payload = {
			user_id: result.id,
			email: result.password,
			firstname: result.firstName,
			lastName: result.lastName,
		};
		const token = jwt.sign(payload, secret, { expiresIn: "1h" });
		return { token: token };
	} else {
		const error = { status: 401 };
		return error;
	}
};
