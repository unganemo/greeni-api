import { Router } from "express";
import { user_routes } from "./api_user";
import { kitchen_routes } from "./api_kitchen";
import { grocery_routes } from "./api_grocery";
import { recipe_routes } from "./api_recipe";
import { sl_routes } from "./api_shopping_list";

const router = Router();

router.use("/user", user_routes);
router.use("/kitchen", kitchen_routes);
router.use("/grocery", grocery_routes);
router.use("/recipe", recipe_routes);
router.use("/shopping_list", sl_routes);

export default router;
