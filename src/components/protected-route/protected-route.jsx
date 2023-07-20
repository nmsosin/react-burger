import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRouteElement = ({onlyUnAuth = false, component}) => {
  const user = useSelector((store) => store.user.user)
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <p>Ждем данные мультипаспорта с орбитальной станции. Пожалуйста, ожидайте за поясом астероидов.</p>;
  // }

  if (onlyUnAuth && user && user.name) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from}/>
  }

  if (!onlyUnAuth && !user.name) {
    return <Navigate to="/login" state={{ from: location } } />;
  }

  return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
