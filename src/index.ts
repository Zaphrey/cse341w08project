import express, { Express, Request, Response, NextFunction } from "express";
import defaultRouter from "@routes/index"
import bodyParser from "body-parser";

const app: Express = express();
const port: String = process.env.PORT || "3000"

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Method", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Request-Headers", "content-type");
})
app.use("/", bodyParser.json())
app.use("/", defaultRouter)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});