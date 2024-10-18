//Ignore for now, still learning GraphQL
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Query {
        hello: String,
        test: (override: Int): Float || Int
    }
`);

export const root = {
    hello(): String {
        return "Hello world";
    },
    test(): Number {
        return Math.random() * 100;
    },
};

export const handler = createHandler({
    schema: schema,
    rootValue: root,
})