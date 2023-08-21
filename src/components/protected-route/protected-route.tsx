import {Navigate, useLocation} from "react-router-dom";
import {getUserAuth, getUserInfo} from "../../utils/constants";
import React, {FC, ReactElement} from "react";
import {useAppSelector} from "../../services/hooks/hooks";

type TProtectedRouteElementProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

export const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({onlyUnAuth = false, component}) => {
  const user = useAppSelector(getUserInfo)
  const isAuthChecked = useAppSelector(getUserAuth);
  const location = useLocation();

  if (onlyUnAuth && user && user.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from}/>
  }

  if (isAuthChecked && !onlyUnAuth && !user.name) {
    return <Navigate to="/login" state={{ from: location } } />;
  }

  return component;
}

export const OnlyAuth = ProtectedRouteElement;

export const OnlyUnAuth: FC<TProtectedRouteElementProps> = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
