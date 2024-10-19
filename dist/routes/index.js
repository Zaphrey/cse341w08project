"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require("../swagger-output.json");
const defaultRouter = (0, express_1.Router)();
defaultRouter.use("/api-docs", swagger_ui_express_1.default.serve);
defaultRouter.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument));
defaultRouter.post("/user", index_1.addUser);
defaultRouter.get("/user", index_1.getUsers);
defaultRouter.get("/user/:id", index_1.getUser);
exports.default = defaultRouter;
