import jwt, { Secret } from "jsonwebtoken";
const secretKey: Secret = process.env.JWT_SECRET || "";

export const checkJwt = (token: string): boolean => {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return true;
  } catch (err) {
    return false;
  }
};
