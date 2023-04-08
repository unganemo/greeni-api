import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import { LoginRequest, SignUpRequest } from "../interfaces/interface_user";
import bcrypt from "bcrypt";

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const sign_up_d = async (request: SignUpRequest) => {
	const session = create_session(driver);
	const result = await session.run(
		"CREATE (u:User { id: $id, email: $email, password: $password, firstName: $firstName, lastName: $lastName }) RETURN u",
		{
			id: get_uuid(),
			email: request.email,
			password: request.password,
			firstName: request.firstName,
			lastName: request.lastName,
		}
	);
	session.close();
	return result.records.map((record) => record.get("u"));
};

export const get_user_by_email = async (email: string) => {
	const session = create_session(driver);
	const result = await session.run(
		`MATCH (u:User {email: $email})
		RETURN u`,
		{ email: email }
	);
	const user = result.records[0].get("u") ?? null;
	console.log(user.properties);

	return user.properties;
};
