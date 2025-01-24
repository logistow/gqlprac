import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { resolvers } from "../schema/resolver";

export const backendSetup = async () => {
  const typeDefs = readFileSync(path.join(__dirname, "../schema/typeDefs.graphql"), {
    encoding: "utf-8",
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the server
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
