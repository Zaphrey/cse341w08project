"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const validators_1 = require("./validators");
require("express-async-errors");
const errorProcessing_1 = require("../errors/errorProcessing");
const swaggerDocument = require("../swagger-output.json");
const defaultRouter = (0, express_1.Router)();
defaultRouter.use("/api-docs", swagger_ui_express_1.default.serve);
defaultRouter.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument));
defaultRouter.post("/user", (0, validators_1.createUserRules)(), index_1.addUser);
defaultRouter.get("/user", index_1.getUsers);
defaultRouter.get("/user/:id", (0, validators_1.getUserRules)(), index_1.getUser);
defaultRouter.put("/user/:id", (0, validators_1.updateUserRules)(), index_1.updateUser);
defaultRouter.delete("/user/:id", (0, validators_1.deleteUserRules)(), index_1.deleteUser);
// This route is just intended to clear up excess documents
defaultRouter.delete("/user", index_1.deleteAllUsers);
defaultRouter.use("/", errorProcessing_1.userValidationError);
exports.default = defaultRouter;
