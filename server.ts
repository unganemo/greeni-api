import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { user_routes } from "./api/api_user";
import { fridge_routes } from "./api/api_fridge";
import { grocery_routes } from "./api/api_grocery";
import router from "./api/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
	console.log(`API listening at http://localhost:${port}`);
});
