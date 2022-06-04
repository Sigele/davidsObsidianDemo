import  { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
// import { applyGraphQL, gql, GQLError } from "https://deno.land/x/oak_graphql/mod.ts"; // uncomment to run demo in oak_graphql
import { gql } from 'https://deno.land/x/obsidian/mod.ts'; 
// import { ObsidianRouter } from 'https://deno.land/x/obsidian/mod.ts'; // uncomment to run demo in using remote Obsidian project (the one on github)
import { ObsidianRouter } from '../obsidian-master/src/Obsidian.ts'; // uncomment to run demo in using local Obsidian project (contains helpful console logs)
import "https://deno.land/x/dotenv/load.ts";
import { typeDefs, ALL_MOVIES, respAllMovies, cache,ALL_ACTION_MOVIES,respAllActionMovies,cache2 } from "../obsidian-master/documentation/browserCache/cache-documentation.js";
const resolvers = { cache, cache2 };
const data = { respAllMovies, respAllActionMovies };
const types = { ALL_MOVIES, ALL_ACTION_MOVIES };

const PORT = 8000;
const app = new Application();

// const data = [
//   {
//     "id": 1,
//     "firstName": "david",
//     "lastName": "palmer"
//   },
//   {
//     "id": 2,
//     "firstName": "Homo",
//     "lastName": "Sapien"
//   }
// ]

// const types = gql`
// type User {
//   id: Int
//   firstName: String
//   lastName: String
// }

// input UserInput {
//   id: Int
//   firstName: String
//   lastName: String
// }

// type ResolveType {
//   done: String
// }

// type Query {
//   getUser: [User!]
// }

// type Mutation {
//   setUser(input: UserInput!): ResolveType!
// }
// `;

// const resolvers = {
//   Query: {
//     getUser: () => {
//       return data;
//     },
//   },
//   Mutation: {
//     setUser: (_, { input: {firstName, lastName }}) => {
//       data.push({ firstName, lastName });
//       console.log(data);
//       return {
//         done: "query success!"
//       }
//     },
//   },
// };

// uncomment to run demo in oak_graphql (make sure to toggle comments on import statement at the top of this file)
// const GraphQLService = await applyGraphQL({
//   Router,
//   typeDefs: types,
//   resolvers: resolvers,
// });

// uncomment to run demo in Obsidian Router (make sure to toggle comments on import statement at the top of this file)
const GraphQLService = await ObsidianRouter({
  Router,
  typeDefs: typeDefs,
  resolvers: resolvers.cache,
  usePlayground: true,
});
  
app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log(`Listening on port ${PORT}`);
await app.listen({ port: PORT });