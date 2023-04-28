import React from "react";

import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

window.app = {
  BASE_URL: "https://news-admin.dadsnetwork.co",
  REACT_APP_API: "https://news-api.dadsnetwork.co/gql/v1",
  REACT_APP_API_AUTH: "https://cms.dadsnetwork.net",
};

// window.app = {
//     BASE_URL: "http://localhost:3000",
//     REACT_APP_API: "http://localhost:5005/gql/v1",
// }

// Create Apllo Client
const mainLink = createUploadLink({
  uri: window.app.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": true,
    "x-apollo-operation-name": "",
  },
}); // HTTP + Upload uri
const authMiddleware = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: concat(authMiddleware, mainLink),
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
ReactDOM.createRoot(container).render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
);
serviceWorker.unregister();
reportWebVitals();
