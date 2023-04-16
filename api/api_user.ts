import express from "express";
import {
  sign_up_s,
  login_s,
  get_kitchen_invites_s,
} from "../security/security_user";

export const user_routes = express.Router();

user_routes.post("/login", async (req, res) => {
  const response = await login_s(req);
  res.setHeader("Content-Type", "application/json");
  if ("token" in response) {
    res.send(JSON.stringify(response, null, 2));
  } else {
    res.sendStatus(response.status);
  }
});

// Signup route
user_routes.post("/sign_up", async (req, res) => {
  const response = await sign_up_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

user_routes.get("/kitchen_invite/:id", async (req, res) => {
  const response = await get_kitchen_invites_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});
