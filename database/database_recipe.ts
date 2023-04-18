import neo4j from "neo4j-driver";
import { create_session, get_env_var, get_uuid } from "./utils";
import {
	CreateRecipeRequest,
	FindRecipeRequest,
	SaveRecipeRequest,
} from "../interfaces/interface_recipe";

const driver = neo4j.driver(
	get_env_var("NEO4J_URI"),
	neo4j.auth.basic(
		get_env_var("NEO4J_USERNAME"),
		get_env_var("NEO4J_PASSWORD")
	)
);

export const find_recipe_d = async (request: FindRecipeRequest) => {
	const session = create_session(driver);
	try {
	} catch (e) {
	} finally {
		session.close();
	}
};

export const create_recipe_d = async (request: CreateRecipeRequest) => {
	const session = create_session(driver);
	console.log("hejhej");
	try {
		const result = await session.run(
			`
      CREATE (r:Recipe {id: $id, title: $title, img: $img, difficulty: $difficulty, time: $time, rating: $rating, numRatings: $numRatings, instructions: $instructions})
      WITH r
      UNWIND $ingridients AS ingridient
      MATCH (g:Grocery {id: ingridient.g_id})
      CREATE (r)-[rel:INGREDIENT]->(g)
      SET rel.amount = ingridient.amount, rel.unit = ingridient.unit
      RETURN r.id AS id
      `,
			{
				id: get_uuid(),
				title: request.title,
				img: request.img,
				difficulty: request.difficulty,
				time: request.time,
				instructions: request.instructions,
				ingridients: request.ingridients,
				rating: 0,
				numRatings: 0,
			}
		);
		return { recipe_id: result.records[0].get("id") };
	} catch (e) {
		console.log(e);
		throw e;
	} finally {
		session.close();
	}
};

export const save_recipe_d = async (request: SaveRecipeRequest) => {
	const session = create_session(driver);
	try {
		const result = await session.run(
			`
      MATCH
        (a:User),
        (b:Recipe)
      WHERE a.id = $user_id AND b.id = $recipe_id
      CREATE (a)-[r:SAVED]->(b)
      RETURN "success" AS message
      `,
			{ user_id: request.user_id, recipe_id: request.recipe_id }
		);

		return { message: result.records[0].get("message") };
	} catch (error) {
		console.log(error);
		return 500;
		throw error;
	} finally {
		session.close();
	}
};

export const find_recipes_by_kitchen_d = async (request: string) => {
	const session = create_session(driver);
	try {
		const result = await session.run(
			`
      MATCH (f:Kitchen)-[:HAS]->(kitchenGroceries)
      WHERE f.id = $kitchen_id
      WITH COLLECT(kitchenGroceries) AS kitchenGroceries

      MATCH (r:Recipe)-[:INGREDIENT]->(recipeGroceries)
      WITH r, kitchenGroceries, COLLECT(recipeGroceries) AS recipeGroceries

      WITH r, [g IN recipeGroceries | {id: g.id, name: g.name, hasGrocery: g IN kitchenGroceries}] AS groceries
      WHERE size([g IN groceries WHERE g.hasGrocery]) >= 3

      RETURN r, groceries
      `,
			{ kitchen_id: request }
		);

		return result.records.map((record) => {
			const recipe = record.get("r");
			const groceries = record.get("groceries");
			return {
				recipe: {
					id: recipe.properties.id,
					title: recipe.properties.title,
					img: recipe.properties.img,
					instructions: recipe.properties.instructions,
					difficulty: recipe.properties.difficulty,
					time: recipe.properties.time,
					rating: recipe.properties.rating,
					numRatings: recipe.properties.numRatings,
					groceries: groceries,
				},
			};
		});
	} catch (e) {
		console.log(e);
		return 500;
	} finally {
		session.close();
	}
};

export const find_recipes_by_groceries_d = async (request: string[]) => {
	const session = create_session(driver);
	console.log(request);
	try {
		const result = await session.run(
			`
      MATCH (g:Grocery)
      WHERE g.id IN $groceries
      WITH COLLECT(g) AS groceries
      
      MATCH (r:Recipe)-[:INGREDIENT]->(recipeGroceries)
      WITH r, groceries, COLLECT(recipeGroceries) AS recipeGroceries
      
      WITH r, [g IN recipeGroceries | {id: g.id, name: g.name, hasGrocery: g IN groceries}] AS groceries
      WHERE size([g IN groceries WHERE g.hasGrocery]) >= 3
      
      RETURN r, groceries
      `,
			{ groceries: request }
		);

		return result.records.map((record) => {
			const recipe = record.get("r");
			const groceries = record.get("groceries");
			return {
				recipe: {
					id: recipe.properties.id,
					title: recipe.properties.title,
					img: recipe.properties.img,
					instructions: recipe.properties.instructions,
					difficulty: recipe.properties.difficulty,
					time: recipe.properties.time,
					rating: recipe.properties.rating,
					numRatings: recipe.properties.numRatings,
					groceries: groceries,
				},
			};
		});
	} catch (e) {
		console.log(e);
		return 500;
	} finally {
		session.close();
	}
};
