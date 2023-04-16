import express from "express";
import {
  new_shopping_list_s,
  add_item_to_shoppinglist_s,
} from "../security/security_shopping_list";

export const sl_routes = express.Router();

sl_routes.post("/new", async (req, res) => {
  const response = await new_shopping_list_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});

sl_routes.post("/add/:sl_id", async (req, res) => {
  const response = await add_item_to_shoppinglist_s(req);
  if (typeof response === "number") res.sendStatus(response);
  else {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
  }
});
