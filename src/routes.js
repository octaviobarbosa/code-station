import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import ForgotPassword from "./pages/ForgotPassword";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorDetail from "./pages/DoctorDetail";

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
        <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <HashRouter>
    <Switch>
      <Route
        exact
        path="/home"
        render={(props) => (
          <Layout>
            <Home />
          </Layout>
        )}
      />

      <Route
        exact
        path="/login"
        render={(props) => (
          <Layout>
            <Login />
          </Layout>
        )}
      />

      <Route
        exact
        path="/create-user"
        render={(props) => (
          <Layout>
            <CreateUser />
          </Layout>
        )}
      />

      <Route
        exact
        path="/forgot-password"
        render={(props) => (
          <Layout>
            <ForgotPassword />
          </Layout>
        )}
      />

      <Route
        exact
        path="/doctor-detail/:id"
        render={(props) => (
          <Layout>
            <DoctorDetail />
          </Layout>
        )}
      />

      <PrivateRoute
        exact
        path="/doctor-profile"
        title="Doctor Profile"
        component={DoctorProfile}
      />
    </Switch>
  </HashRouter>
);

export default Routes;
