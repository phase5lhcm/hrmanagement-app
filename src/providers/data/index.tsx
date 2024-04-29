import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

// TODO - change APIs to APIs provided from abckend
export const API_BASE_URL = "https://api.crm.refine.dev";
export const API_URL = `${API_BASE_URL}/graphql}`;
export const WS_URL = "wss://api.crm/refine.dev/graphql";

// sets up a GraphQL client instance that uses a custom fetch function
// (fetchWrapper) to send requests to the GraphQL server.
// Useful for adding custom logic or handling errors during the fetch operation.
export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

// listens to subscriptions for changes so that updates are made in real time across different screens
export const wsClient =
  typeof window != "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accesstoken = localStorage.getItem("access_token");

          return {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          };
        },
      })
    : undefined;

// Makes requests to API
export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;
