import { addUser, getUsers, getUser } from "@controllers/index";
import { Router } from "express";

const defaultRouter = Router()

defaultRouter.post("/user", addUser);
defaultRouter.get("/user", getUsers);
defaultRouter.get("/user/:id", getUser)

export default defaultRouter;

