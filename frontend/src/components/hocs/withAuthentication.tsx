import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../store/duck/auth";

const withAuthentication = (Component: any) => (props: any) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  // @ts-ignore
  return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
};

export default withAuthentication;
