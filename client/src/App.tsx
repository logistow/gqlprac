import "./App.css";
import { Dashboard } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./consts";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path={PATH.INTERFACE}
            element={<Navigate to={PATH.DASHBOARD} />}
          />
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
