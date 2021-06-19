import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/layout";
import Login from "./pages/Login";

// temporario
const isAuthenticated = () => {
  return true;
};

const PrivateRoute = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      {/* <Route path="/registrar" component={() => <h1>Cadastrar</h1>} />
      <Route path="/esqueci-senha" component={() => <h1>Esqueci Senha</h1>} /> */}

      <PrivateRoute path="/home" title="Home" component={Home} />
    </Switch>
  </HashRouter>
);

export default Routes;
