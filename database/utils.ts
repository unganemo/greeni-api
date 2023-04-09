import dotenv from "dotenv";
import { Driver, Session } from "neo4j-driver";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const create_session = (driver: Driver): Session => {
	const session = driver.session();
	return session;
};

const get_env_var = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Environment variable ${name} not found.`);
	}
	return value;
};

const get_uuid = (): string => {
	return uuidv4();
};

export { create_session, get_env_var, get_uuid };
