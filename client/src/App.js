import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// component
import HeaderNavbar from "./components/common/HeaderNavbar";
import Home from "./components/pages/Home";
import Attractions from "./components/pages/Attractions";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// theme
const theme = {
  primary: "#df691a",
  secondary: "#4e5d6c",
  success: "#5cb85c",
  info: "#5bc0de",
  warning: "#f0ad4e",
  danger: "#d9534f",
  text_light:"#fff",
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <HeaderNavbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/attractions">
              <Attractions />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
