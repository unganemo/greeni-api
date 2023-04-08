import { Router } from "express";
import { user_routes } from "./api_user";
import { fridge_routes } from "./api_fridge";
import { grocery_routes } from "./api_grocery";
import { recipe_routes } from "./api_recipe";

const router = Router();

router.use("/user", user_routes);
router.use("/fridge", fridge_routes);
router.use("/grocery", grocery_routes);
router.use("/recipe", recipe_routes);

export default router;
