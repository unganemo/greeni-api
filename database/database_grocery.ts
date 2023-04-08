import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import { NewGroceryRequest } from "../interfaces/interface_grocery";

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const new_grocery_d = async (request: NewGroceryRequest) => {
	const session = create_session(driver);

	const result = await session.run(
		`
    CREATE (g:Grocery {id: $id, name: $name})
    RETURN g.id AS id, g.name AS name
  `,
		{
			id: get_uuid(),
			name: request.name,
		}
	);
	session.close();
	return result.records.map((record) => ({
		id: record.get("id"),
		name: record.get("name"),
	}));
};
