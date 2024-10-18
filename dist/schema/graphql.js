"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.root = exports.schema = void 0;
//Ignore for now, still learning GraphQL
const express_1 = require("graphql-http/lib/use/express");
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
    type Query {
        hello: String,
        test: (override: Int): Float || Int
    }
`);
exports.root = {
    hello() {
        return "Hello world";
    },
    test() {
        return Math.random() * 100;
    },
};
exports.handler = (0, express_1.createHandler)({
    schema: exports.schema,
    rootValue: exports.root,
});
