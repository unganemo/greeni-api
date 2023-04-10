import {
	AcceptInviteToFridgeRequest,
	InviteUserToFridgeRequest,
	NewFridgeRequest,
} from "../interfaces/interface_fridge";
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
	try {
		const result = await session.run(
			`
		CREATE (f:Fridge {id: $id, location: $point})
		WITH f
		MATCH (u:User {id: $user_id})
		CREATE (u)-[r:OWNS]->(f)
		SET r.name = $name
		RETURN f.id AS id, r.name AS name, f.location AS location
	  `,
			{
				id: get_uuid(),
				point: point,
				user_id: request.user_id,
				name: request.name,
			}
		);
		session.close();
		return result.records.map((record) => ({
			id: record.get("id"),
			name: record.get("name"),
			location: record.get("location"),
		}));
	} catch (e) {
		throw e;
	}
};

export const invite_user_to_fridge_d = async (
	request: InviteUserToFridgeRequest
) => {
	const session = create_session(driver);
	try {
		const now = new Date();
		const sent_at = now.toISOString();
		const result = await session.run(
			`
			MATCH (u1:User {id: $owner_id}), (u2:User {email: $invitee_email})
			CREATE (u1)-[r:INVITES]->(u2)
			SET r.fridge_id = $fridge_id, r.sent_at = $sent_at
			RETURN "invited" AS message
			`,
			{
				owner_id: request.owner_id,
				invitee_email: request.invitee_email,
				fridge_id: request.fridge_id,
				sent_at: sent_at,
			}
		);
		session.close();
		return {
			success:
				result.records[0].get("message") === "invited" ? true : false,
		};
	} catch (error) {
		throw error;
	}
};

export const accept_invite_to_fridge_d = async (
	request: AcceptInviteToFridgeRequest
) => {
	const session = create_session(driver);
	try {
		const result = await session.run(
			`
			MATCH (u1:User{id: $owner_id})-[inv:INVITES {fridge_id:$fridge_id}]->(u2:User {id: $invited_id})
			DELETE inv
			WITH u2
			MATCH (f:Fridge {id: $fridge_id})
			CREATE (u2)-[r:SUBSCRIBES_TO]->(f)
			SET r.name = $name
			RETURN f
		   `,
			{
				owner_id: request.owner_id,
				invited_id: request.invited_id,
				fridge_id: request.fridge_id,
				name: request.name,
			}
		);

		if (result.records.length > 0) {
			const fridge = result.records[0].get("f");
			console.log(
				`User with ID ${request.invited_id} has subscribed to fridge with ID ${fridge.id}`
			);
		} else {
			console.log("Invitation not found or user is not invited");
		}
	} catch (error) {
		console.log(error);
	} finally {
		await session.close();
	}
};

export const get_fridge_content_d = async (request: string) => {
	const session = create_session(driver);
	try {
		const fridgeIds = await session.run(
			"MATCH (u:User {id: $user_id}) OPTIONAL MATCH (u)-[r:OWNS|SUBSCRIBES_TO]->(f:Fridge) RETURN f.id AS fridge_id, r.name AS fridge_name, CASE WHEN type(r) = 'OWNS' THEN true ELSE false END AS owner",
			{ user_id: request }
		);

		const result = [];
		for (const record of fridgeIds.records) {
			const fridge_id = record.get("fridge_id");
			const fridge_name = record.get("fridge_name");
			const owner = record.get("owner");
			console.log(fridge_name);
			const fridge = await session.run(
				`
				MATCH (f:Fridge {id: $fridge_id})
				OPTIONAL MATCH (f)-[in_rel:HAS]->(g:Grocery)
				RETURN f.id AS fridge_id, $fridge_name AS fridge_name, $owner AS isOwner, f.location AS location, collect({ id: g.id, name: g.name, expires: in_rel.expires, purchased: in_rel.purchased }) AS groceries
				`,
				{ fridge_id: fridge_id, fridge_name: fridge_name, owner: owner }
			);
			result.push(fridge.records[0].toObject());
		}
		return result;
	} catch (error) {
		console.log(error);
	} finally {
		await session.close();
	}
};
