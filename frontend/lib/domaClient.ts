import { ApolloClient, InMemoryCache } from "@apollo/client";

export const domaClient = new ApolloClient({
  uri: "https://api-testnet.doma.xyz/graphql", // testnet endpoint
  cache: new InMemoryCache(),
});
