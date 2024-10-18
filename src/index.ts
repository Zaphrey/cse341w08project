import express, { Express, Request, Response } from "express";
import defaultRouter from "@routes/index"
import bodyParser from "body-parser";

const app: Express = express();
const port: String = process.env.PORT || "3000"

app.use("/", bodyParser.json())
app.use("/", defaultRouter)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});