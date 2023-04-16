import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import {
  NewShoppingListRequest,
  AddItemToShoppingListRequest,
} from "../interfaces/interface_shopping_list";

const driver = neo4j.driver(
  get_env_var("NEO4J_URI"),
  neo4j.auth.basic(get_env_var("NEO4J_USERNAME"), get_env_var("NEO4J_PASSWORD"))
);

export const new_shopping_list_d = async (request: NewShoppingListRequest) => {
  const session = create_session(driver);
  try {
    const now = new Date();
    const created_at = now.toISOString();
    const result = await session.run(
      `
        CREATE (sl:ShoppingList {id: $id, name: $name, created_at: $created_at})
        WITH sl
        MATCH (u:User {id: $user_id})
        CREATE (u)-[r:CREATED]->(sl)
        RETURN {
            sl_id: sl.id,
            user_id: $user_id,
            sl_name: sl.name,
            sl_created_at: sl.created_at
        } AS sl_return
        `,
      {
        id: get_uuid(),
        name: request.name,
        created_at: created_at,
        user_id: request.user_id,
      }
    );
    return result.records[0].toObject();
  } catch (e) {
    console.log(e);
    return 400;
    throw e;
  } finally {
    session.close();
  }
};

export const add_item_to_shoppinglist_d = async (
  request: AddItemToShoppingListRequest
) => {
  const session = create_session(driver);
  try {
    const result = await session.run(
      `
			MATCH (sl:ShoppingList {id: $sl_id})
			FOREACH (id in $groceries |
			  MERGE (g:Grocery {id: id})
        MERGE (sl)-[:INCLUDES]->(g)
			)
        	`,
      {
        sl_id: request.sl_id,
        groceries: request.groceries,
      }
    );

    return { success: true };
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    session.close();
  }
};
