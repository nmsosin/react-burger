import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRouteElement = ({onlyUnAuth = false, component}) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked)
  const user = useSelector((store) => store.user.user)
  const location = useLocation();

  // if (!isAuthChecked) {
  //   //TODO: return preloader instead of null
  //   console.log(user);
  //   console.log(isAuthChecked);
  //
  //   return <h1>Logging in preloader... Please, wait</h1>;
  // }

  //TODO: figure out with routes & redirections
  if (onlyUnAuth && user && user.name) {
    console.log('Этот компонент - только для НЕавторизованных пользователей, а пользователь авторизован!')
    console.log(user);
    console.log(isAuthChecked);

    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from}/>
  }

  if (!onlyUnAuth && !user.name) {
    console.log('Этот компонент - только для авторизованных пользователей, а пользователь НЕ авторизован!')
    console.log(user);
    console.log(isAuthChecked);
    return <Navigate to="/login" state={{ from: location } } />;
  }

  return component;
}

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
