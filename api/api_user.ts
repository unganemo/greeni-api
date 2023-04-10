import express from "express";
import {
	sign_up_v,
	login_v,
	get_fridge_invites_v,
} from "../validation/validation_user";

export const user_routes = express.Router();

user_routes.post("/login", async (req, res) => {
	const response = await login_v(req.body);
	res.setHeader("Content-Type", "application/json");
	if ("token" in response) {
		res.send(JSON.stringify(response, null, 2));
	} else {
		res.sendStatus(response.status);
	}
});

// Signup route
user_routes.post("/sign_up", async (req, res) => {
	const response = await sign_up_v(req.body);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});

user_routes.get("/fridge_invite/:id", async (req, res) => {
	const response = await get_fridge_invites_v(req.params.id);
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(response, null, 2));
});
