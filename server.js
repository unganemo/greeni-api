"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const driver = neo4j_driver_1.default.driver(
	process.env.NEO4J_URI,
	neo4j_driver_1.default.auth.basic(
		process.env.NEO4J_USER,
		process.env.NEO4J_PASSWORD
	)
);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
	res.send("Hello, World!");
});
app.listen(port, () => {
	console.log(`API listening at http://localhost:${port}`);
});
