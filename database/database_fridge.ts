import { NewFridgeRequest } from "../interfaces/interface_fridge";
import neo4j from "neo4j-driver";
import { Point } from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
const SRID = 4326;

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const new_fridge_d = async (request: NewFridgeRequest) => {
	const session = create_session(driver);
	const point = new Point(
		SRID,
		request.location.longitude,
		request.location.latitude
	);

	const result = await session.run(
		`
    CREATE (f:Fridge {id: $id, name: $name, location: $point})
    RETURN f.id AS id, f.name AS name, f.location AS location
  `,
		{
			id: get_uuid(),
			name: request.name,
			point: point,
		}
	);
	session.close();
	return result.records.map((record) => ({
		id: record.get("id"),
		name: record.get("name"),
		location: record.get("location").properties,
	}));
};
