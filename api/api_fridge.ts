import express from "express";
import {
	new_fridge_v,
	invite_user_to_fridge_v,
	accept_invite_to_fridge_v,
} from "../validation/validation_fridge";

export const fridge_routes = express.Router();

fridge_routes.post("/new_fridge", async (req, res) => {
	const response = await new_fridge_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});

fridge_routes.post("/invite_user", async (req, res) => {
	const response = await invite_user_to_fridge_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});

fridge_routes.put("/accept_invite", async (req, res) => {
	const response = await accept_invite_to_fridge_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});
