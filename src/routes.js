import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import ForgotPassword from "./pages/ForgotPassword";

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
      <Route
        exact
        path="/"
        render={(props) => (
          <Layout>
            <Login />
          </Layout>
        )}
      />

      <Route
        path="/create-user"
        render={(props) => (
          <Layout>
            <CreateUser />
          </Layout>
        )}
      />

      <Route
        path="/forgot-password"
        render={(props) => (
          <Layout>
            <ForgotPassword />
          </Layout>
        )}
      />

      <PrivateRoute path="/home" title="Home" component={Home} />
    </Switch>
  </HashRouter>
);

export default Routes;
