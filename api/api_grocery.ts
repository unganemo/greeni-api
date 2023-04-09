import express from "express";
import {
	new_grocery_v,
	add_grocery_to_fridge_v,
} from "../validation/validation_grocery";

export const grocery_routes = express.Router();

grocery_routes.post("/new_grocery", async (req, res) => {
	const response = await new_grocery_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});

grocery_routes.post("/add_to_fridge", async (req, res) => {
	const response = await add_grocery_to_fridge_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});
