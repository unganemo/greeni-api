import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import {
	NewGroceryRequest,
	AddGroceryToKitchenRequest,
	DeleteGroceryRequest,
} from "../interfaces/interface_grocery";

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const delete_grocery_from_kitchen_d = async (
	request: DeleteGroceryRequest
) => {
	const session = create_session(driver);

	try {
		const result = await session.run(
			`MATCH(:Kitchen)-[r:HAS {id: $has_id}]->(:Grocery)
      DELETE r`,
			{
				has_id: request,
			}
		);
		return 204;
	} catch (e) {
		console.log(e);
		return 500;
	} finally {
		session.close();
	}
};

export const get_all_groceries_d = async () => {
	const session = create_session(driver);

	try {
		const result = await session.run(
			`
			MATCH (g:Grocery)
			RETURN COLLECT({
				id: g.id,
				name: g.name,
				days: g.days
			}) AS groceries
			`
		);

		return result.records[0].toObject();
	} catch (e) {
		console.log(e);
		throw e;
	} finally {
		session.close();
	}
};

export const new_grocery_d = async (request: NewGroceryRequest) => {
	const session = create_session(driver);

	const result = await session.run(
		`
		MATCH (g:Grocery {name: $name})
		WITH g
		LIMIT 1
		RETURN g.id AS id, g.name AS name, g.days AS days
		UNION
		CREATE (g:Grocery {id: $id, name: $name, days: $days})
		RETURN g.id AS id, g.name AS name, g.days AS days
  `,
		{
			id: get_uuid(),
			name: request.name,
			days: request.days,
		}
	);
	session.close();
	return result.records.map((record) => ({
		id: record.get("id"),
		name: record.get("name"),
		days: record.get("days"),
	}));
};

export const add_grocery_to_kitchen_d = async (
	request: AddGroceryToKitchenRequest
) => {
	const session = create_session(driver);

	if (request.grocery_id) {
		const result = await session.run(
			`
		MATCH (g:Grocery),(f:Kitchen)
		WHERE g.id = $grocery_id AND f.id = $kitchen_id
		CREATE (f)-[r:HAS]->(g)
		SET r.expires = $expires, r.purchased = $purchased, r.id = $has_id
		RETURN g.name AS name, r.expires AS expires, r.purchased AS purchased, g.id AS grocery_id, r.id AS has_id
		`,
			{
				grocery_id: request.grocery_id,
				kitchen_id: request.kitchen_id,
				has_id: get_uuid(),
				expires: request.expires,
				purchased: request.purchased,
			}
		);

		session.close();

		const record = result.records[0];

		if (record) {
			return {
				id: record.get("grocery_id"),
				name: record.get("name"),
				expires: record.get("expires"),
				purchased: record.get("purchased"),
				has_id: record.get("has_id"),
			};
		}
	} else if (request.grocery_name) {
		const result = await session.run(
			`
		CREATE (g:Grocery {id: $grocery_id, name: $grocery_name})
		WITH g
		MATCH (f:Kitchen {id: $kitchen_id})
		CREATE (f)-[r:HAS]->(g)
		SET r.expires = $expires, r.purchased = $purchased, r.id = $has_id
		RETURN g.name AS name, r.expires AS expires, r.purchased AS purchased, g.id AS grocery_id, r.id AS has_id
		`,
			{
				grocery_id: get_uuid(),
				grocery_name: request.grocery_name,
				kitchen_id: request.kitchen_id,
				expires: request.expires,
				purchased: request.purchased,
				has_id: get_uuid(),
			}
		);

		session.close();

		return result.records.map((record) => ({
			id: record.get("grocery_id"),
			name: record.get("name"),
			expires: record.get("expires"),
			purchased: record.get("purchased"),
			has_id: record.get("has_id"),
		}));
	} else {
		throw new Error(
			"Either grocery_id or grocery_name must be present in the request"
		);
	}
};

export const get_grocery_by_name_d = async (request: string) => {
	const session = create_session(driver);
	try {
		const result = await session.run(
			`
		MATCH (g:Grocery)
		WHERE toLower(g.name) CONTAINS toLower($search)
		RETURN COLLECT(g) as groceries
		`,
			{ search: request }
		);
		const groceries = result.records[0].get("groceries");
		if (groceries.length === 0) {
			return "No groceries found";
		} else {
			return groceries;
		}
	} catch (e) {
		console.log(e);
		throw e;
	} finally {
		session.close();
	}
};
