import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const app = express();
const port = 3000;

const driver = neo4j.driver(
	process.env.NEO4J_URI!,
	neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(port, () => {
	console.log(`API listening at http://localhost:${port}`);
});
