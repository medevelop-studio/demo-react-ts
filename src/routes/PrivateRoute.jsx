import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, permissionLevel, allowOnly, user, isAuthenticated, isLoaded, authFailure, ...rest }) => (
  <Route
    {...rest}
    render={() => {
      if (permissionLevel > user.permissionLevel) {
        return <Redirect to="/" />;
      }

      if (allowOnly && allowOnly !== user.permissionLevel) {
        return <Redirect to="/" />;
      }

      return localStorage.ACCESS_TOKEN ? (
        !authFailure && isLoaded && (isAuthenticated ? children : <Redirect to="/" />)
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

const mapStateToProps = state => ({
  authFailure: state.auth.authFailure,
  isAuthenticated: state.auth.isAuthenticated,
  isLoaded: state.auth.isLoaded,
  user: state.auth.user
});

export default connect(mapStateToProps, {})(PrivateRoute);
