import { LoginRequest, SignUpRequest } from "../interfaces/interface_user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Token } from "../interfaces/interface_user";
import { TokenError } from "../interfaces/interface_error";
import {
  get_kitchen_invites_v,
  login_v,
  sign_up_v,
} from "../validation/validation_user";
import { checkJwt } from "./utils";
dotenv.config();
const secret = process.env.JWT_SECRET || "default_secret";

export const sign_up_s = async (body: any) => {
  return await sign_up_v(body);
};

export const login_s = async (request: any): Promise<Token | TokenError> => {
  const result = await login_v(request.body);
  if (result != null) {
    const payload = {
      user_id: result.id,
      email: result.password,
      firstname: result.firstName,
      lastName: result.lastName,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "24h" });
    return { token: token };
  } else {
    const error = { status: 401 };
    return error;
  }
};

export const get_kitchen_invites_s = async (request: any) => {
  if (checkJwt(request.headers.authorization))
    return await get_kitchen_invites_v(request);
  else return 401;
};
