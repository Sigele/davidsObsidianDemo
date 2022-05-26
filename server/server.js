import  { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
// import { applyGraphQL, gql, GQLError } from "https://deno.land/x/oak_graphql/mod.ts";
import { ObsidianRouter, gql } from 'https://deno.land/x/obsidian/mod.ts';
import "https://deno.land/x/dotenv/load.ts";

const PORT = 8000;
const app = new Application();

const users = [
  {
    "firstName": "david",
    "lastName": "palmer"
  },
  {
    "firstName": "Avery",
    "lastName": "Garcia"
  }
]

const types = gql`
type User {
  firstName: String
  lastName: String
}

input UserInput {
  firstName: String
  lastName: String
}

type ResolveType {
  done: Boolean
}

type Query {
  getUser: [User!]
}

type Mutation {
  setUser(input: UserInput!): ResolveType!
}
`;

const resolvers = {
  Query: {
    getUser: () => {
      return users;
    },
  },
  Mutation: {
    setUser: (_, { input: {firstName, lastName }}) => {
      users.push({ firstName, lastName });
      return {
        done: true
      }
    },
  },
};

// const GraphQLService = await applyGraphQL({
//   Router,
//   typeDefs: types,
//   resolvers: resolvers,
// });
console.log('TEST');
console.log(Deno.env.get("REDIS_HOST"));
const GraphQLService = await ObsidianRouter({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  usePlayground: true,
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

app.use(ctx => {  
  ctx.response.body = "Hello World";
});

console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });