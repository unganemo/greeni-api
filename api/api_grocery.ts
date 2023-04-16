import express from "express";
import {
  new_grocery_s,
  add_grocery_to_kitchen_s,
  get_all_groceries_s,
  get_grocery_by_name_s,
} from "../security/security_grocery";

export const grocery_routes = express.Router();

//Adds a new grocery
grocery_routes.post("/new_grocery", async (req, res) => {
  const response = await new_grocery_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

//Adds grocery to a kitchen
grocery_routes.post("/add_to_kitchen", async (req, res) => {
  const response = await add_grocery_to_kitchen_s(req);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 2));
});

//Gets all groceries
grocery_routes.get("/", async (req, res) => {
  const response = await get_all_groceries_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

//Gets groceries that contains parts of search query
grocery_routes.get("/:search", async (req, res) => {
  const response = await get_grocery_by_name_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});
