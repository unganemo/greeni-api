import {
  AcceptInviteToKitchenRequest,
  InviteUserToKitchenRequest,
  NewKitchenRequest,
} from "../interfaces/interface_kitchen";
import neo4j from "neo4j-driver";
import { Point } from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
const SRID = 4326;

const driver = neo4j.driver(
  get_env_var("NEO4J_URI"),
  neo4j.auth.basic(get_env_var("NEO4J_USERNAME"), get_env_var("NEO4J_PASSWORD"))
);

export const new_kitchen_d = async (request: NewKitchenRequest) => {
  const session = create_session(driver);
  const point = new Point(
    SRID,
    request.location.longitude,
    request.location.latitude
  );
  try {
    const result = await session.run(
      `
		CREATE (f:Kitchen {id: $id, location: $point})
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

export const invite_user_to_kitchen_d = async (
  request: InviteUserToKitchenRequest
) => {
  const session = create_session(driver);
  try {
    const now = new Date();
    const sent_at = now.toISOString();
    const result = await session.run(
      `
			MATCH (u1:User {id: $owner_id}), (u2:User {email: $invitee_email})
			CREATE (u1)-[r:INVITES]->(u2)
			SET r.kitchen_id = $kitchen_id, r.sent_at = $sent_at
			RETURN "invited" AS message
			`,
      {
        owner_id: request.owner_id,
        invitee_email: request.invitee_email,
        kitchen_id: request.kitchen_id,
        sent_at: sent_at,
      }
    );
    session.close();
    return {
      success: result.records[0].get("message") === "invited" ? true : false,
    };
  } catch (error) {
    throw error;
  }
};

export const accept_invite_to_kitchen_d = async (
  request: AcceptInviteToKitchenRequest
) => {
  const session = create_session(driver);
  try {
    const result = await session.run(
      `
			MATCH (u1:User{id: $owner_id})-[inv:INVITES {kitchen_id:$kitchen_id}]->(u2:User {id: $invited_id})
			DELETE inv
			WITH u2
			MATCH (f:kitchen {id: $kitchen_id})
			CREATE (u2)-[r:SUBSCRIBES_TO]->(f)
			SET r.name = $name
			RETURN f
		   `,
      {
        owner_id: request.owner_id,
        invited_id: request.invited_id,
        kitchen_id: request.kitchen_id,
        name: request.name,
      }
    );

    if (result.records.length > 0) {
      const kitchen = result.records[0].get("f");
      console.log(
        `User with ID ${request.invited_id} has subscribed to kitchen with ID ${kitchen.id}`
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

export const get_kitchen_content_d = async (request: string) => {
  const session = create_session(driver);
  try {
    const kitchenIds = await session.run(
      "MATCH (u:User {id: $user_id}) OPTIONAL MATCH (u)-[r:OWNS|SUBSCRIBES_TO]->(f:Kitchen) RETURN f.id AS kitchen_id, r.name AS kitchen_name, CASE WHEN type(r) = 'OWNS' THEN true ELSE false END AS owner",
      { user_id: request }
    );

    const result = [];
    for (const record of kitchenIds.records) {
      const kitchen_id = record.get("kitchen_id");
      const kitchen_name = record.get("kitchen_name");
      const owner = record.get("owner");
      console.log(kitchen_name);
      const kitchen = await session.run(
        `
				MATCH (f:Kitchen {id: $kitchen_id})
				OPTIONAL MATCH (f)-[in_rel:HAS]->(g:Grocery)
				RETURN f.id AS kitchen_id, $kitchen_name AS kitchen_name, $owner AS isOwner, f.location AS location, collect({ id: g.id, name: g.name, expires: in_rel.expires, purchased: in_rel.purchased }) AS groceries
				`,
        { kitchen_id: kitchen_id, kitchen_name: kitchen_name, owner: owner }
      );
      result.push(kitchen.records[0].toObject());
    }
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    await session.close();
  }
};
