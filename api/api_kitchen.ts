import express from "express";
import {
  new_kitchen_s,
  invite_user_to_kitchen_s,
  accept_invite_to_kitchen_s,
  get_kitchen_content_s,
} from "../security/security_kitchen";

export const kitchen_routes = express.Router();

//Creates a new kitchen
kitchen_routes.post("/new_kitchen", async (req, res) => {
  const response = await new_kitchen_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

//Invites user to a kitchen
kitchen_routes.post("/invite_user", async (req, res) => {
  const response = await invite_user_to_kitchen_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

//Accepts invite to a kitchen
kitchen_routes.put("/accept_invite", async (req, res) => {
  const response = await accept_invite_to_kitchen_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

//Gets all kitchen info and content of user
kitchen_routes.get("/get/:id", async (req, res) => {
  const response = await get_kitchen_content_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});
