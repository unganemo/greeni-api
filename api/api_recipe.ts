import express from "express";
import { find_recipe_v } from "../validation/validation_recipe";

export const recipe_routes = express.Router();

recipe_routes.post("/find_recipe", async (req, res) => {
	const response = await find_recipe_v(req.query.groceries as string[]);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});
