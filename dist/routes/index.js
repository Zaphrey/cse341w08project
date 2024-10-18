"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const defaultRouter = (0, express_1.Router)();
defaultRouter.post("/user", index_1.addUser);
defaultRouter.get("/user", index_1.getUsers);
defaultRouter.get("/user/:id", index_1.getUser);
exports.default = defaultRouter;
