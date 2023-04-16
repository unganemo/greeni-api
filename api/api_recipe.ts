import express from "express";
import {
  find_recipe_s,
  create_recipe_s,
  save_recipe_s,
  find_recipes_by_kitchen_s,
  find_recipes_by_groceries_s,
} from "../security/security_recipe";

export const recipe_routes = express.Router();

//Finds recipe based on grocery IDs
recipe_routes.get("/find/:ids", async (req, res) => {
  const response = await find_recipe_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

//Create a recipe. Returns ID of recipe
recipe_routes.post("/create", async (req, res) => {
  const response = await create_recipe_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

recipe_routes.put("/save", async (req, res) => {
  const response = await save_recipe_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

recipe_routes.get("/kitchen/:id", async (req, res) => {
  const response = await find_recipes_by_kitchen_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

recipe_routes.get("/grocery/:ids", async (req, res) => {
  const ids = req.params.ids.split(",");
  const response = await find_recipes_by_groceries_s(req, ids);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});
