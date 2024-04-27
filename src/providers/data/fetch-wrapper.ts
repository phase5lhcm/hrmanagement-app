/**
 * A middleware that handles authorization and handles errors
 */

import { GraphQLFormattedError } from "graphql";

type Error = {
  message: string;
  statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");
  const headers = options.headers as Record<string, string>;
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.AuthorizationL || `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Apollo-Require-Priflight": "true", //
    },
  });
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: "Unknown Error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body?.errors;

    // turn all messages into one
    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500,
    };
  }
  return null;
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options);
  // once a response body is read, it is already consumed and cannot be read again
  // use a clone of the response tp be able to process the response in different ways
  // for example, to get the errors and body below
  const responseClone = response.clone();
  const body = await responseClone.json();

  const error = getGraphQLErrors(body);

  if (error) {
    throw error;
  }
  return response;
};
