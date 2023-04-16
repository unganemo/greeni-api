import Joi from "joi";

export const findRecipeRequestSchema = Joi.object({
  groceries: Joi.array().items(Joi.string()).required(),
});

const allowedDifficulties = ["beginner", "easy", "medium", "hard", "advanced"];

export const createRecipeRequestSchema = Joi.object({
  title: Joi.string().required(),
  ingridients: Joi.array().items(
    Joi.object({
      g_id: Joi.string().required(),
      amount: Joi.number(),
      unit: Joi.string(),
    })
  ),
  instructions: Joi.array().items(Joi.string()),
  time: Joi.number().required(),
  img: Joi.string().required(),
  difficulty: Joi.string()
    .valid(...allowedDifficulties)
    .required(),
});

export const saveRecipeRequestSchema = Joi.object({
  user_id: Joi.string().required(),
  recipe_id: Joi.string().required(),
});
