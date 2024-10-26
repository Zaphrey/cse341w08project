import { addUser, getUsers, getUser, updateUser, deleteUser, deleteAllUsers } from "@controllers/index";
import { NextFunction, Request, Response, Router } from "express";
import swaggerUi from "swagger-ui-express";
import { getUserRules, createUserRules, updateUserRules, deleteUserRules } from "./validators";
require("express-async-errors")
import { userValidationError } from "@error/errorProcessing";

const swaggerDocument = require("../swagger-output.json")
const defaultRouter = Router()

defaultRouter.use("/api-docs", swaggerUi.serve);
defaultRouter.get("/api-docs", swaggerUi.setup(swaggerDocument))

defaultRouter.post("/user", createUserRules(), addUser);
defaultRouter.get("/user", getUsers);
defaultRouter.get("/user/:id", getUserRules(), getUser);
defaultRouter.put("/user/:id", updateUserRules(), updateUser);

defaultRouter.delete("/user/:id", deleteUserRules(), deleteUser)

// This route is just intended to clear up excess documents
defaultRouter.delete("/user", deleteAllUsers)

defaultRouter.use("/", userValidationError);

export default defaultRouter;

