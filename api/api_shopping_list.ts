import express from "express";
import { new_shopping_list_v } from "../validation/validation_shopping_list";

export const sl_routes = express.Router();

sl_routes.post("/new", async (req, res) => {
	const response = await new_shopping_list_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});
