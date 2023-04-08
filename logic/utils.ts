import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const get_hash = async (password: string): Promise<string> => {
	const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS ?? "10", 10);
	return await bcrypt.hash(password, SALT_ROUNDS);
};
