import { addUser, getUsers, getUser } from "@controllers/index";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
//const swaggerDocument = require("../swagger-output.json")
const defaultRouter = Router()

// defaultRouter.use("/api-docs", swaggerUi.serve);
// defaultRouter.get("/api-docs", swaggerUi.setup(swaggerDocument))

defaultRouter.post("/user", addUser);
defaultRouter.get("/user", getUsers);
defaultRouter.get("/user/:id", getUser)

export default defaultRouter;

