import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import { FindRecipeRequest } from "../interfaces/interface_recipe";

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const find_recipe_d = async (request: FindRecipeRequest) => {
	const session = create_session(driver);

	session.close();
};
