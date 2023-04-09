import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import {
	NewGroceryRequest,
	AddGroceryToFridgeRequest,
} from "../interfaces/interface_grocery";
import { number } from "joi";

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

export const add_grocery_to_fridge_d = async (
	request: AddGroceryToFridgeRequest
) => {
	const session = create_session(driver);

	if (request.grocery_id) {
		const result = await session.run(
			`
		MATCH (g:Grocery),(f:Fridge)
		WHERE g.id = $grocery_id AND f.id = $fridge_id
		CREATE (g)-[r:LIVES_IN]->(f)
		SET r.expires = $expires, r.purchased = $purchased
		RETURN g.name AS name, r.expires AS expires, r.purchased AS purchased, g.id AS id
		`,
			{
				grocery_id: request.grocery_id,
				fridge_id: request.fridge_id,
				expires: request.expires,
				purchased: request.purchased,
			}
		);

		session.close();

		return result.records.map((record) => ({
			id: record.get("id"),
			name: record.get("name"),
			expires: record.get("expires"),
			purchased: record.get("purchased"),
		}));
	} else if (request.grocery_name) {
		const result = await session.run(
			`
		CREATE (g:Grocery {id: $grocery_id, name: $grocery_name})
		WITH g
		MATCH (f:Fridge {id: $fridge_id})
		CREATE (g)-[r:LIVES_IN]->(f)
		SET r.expires = $expires, r.purchased = $purchased
		RETURN g.name AS name, r.expires AS expires, r.purchased AS purchased, g.id AS id
		`,
			{
				grocery_id: get_uuid(),
				grocery_name: request.grocery_name,
				fridge_id: request.fridge_id,
				expires: request.expires,
				purchased: request.purchased,
			}
		);

		session.close();

		return result.records.map((record) => ({
			id: record.get("id"),
			name: record.get("name"),
			expires: record.get("expires"),
			purchased: record.get("purchased"),
		}));
	} else {
		throw new Error(
			"Either grocery_id or grocery_name must be present in the request"
		);
	}
};
