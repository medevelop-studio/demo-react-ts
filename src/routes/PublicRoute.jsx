import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ children, ...rest }) => <Route {...rest} render={() => children} />;

export default PublicRoute;
