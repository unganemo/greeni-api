import express from "express";
import { new_fridge_v } from "../validation/validation_fridge";

export const fridge_routes = express.Router();

fridge_routes.post("/new_fridge", async (req, res) => {
	const response = await new_fridge_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});

// Signup route
fridge_routes.post("/add_user_to_fridge", async (req, res) => {});
