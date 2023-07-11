import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import appHeaderStyles from './app-header.module.css';
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const AppHeader = () => {
  const user = useSelector((store) => store.user.user)
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked)

  console.log(user)

  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavLink
            to="/"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'constructor'} text='Конструктор' />
          </NavLink>

          <NavLink
            to="/register"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'orders'} text='Лента заказов' />
          </NavLink>
        </div>
        <Logo />

        <NavLink
          to="/profile"
          // activeClassName={appHeaderStyles.active}
        >
          <NavigationButton type={'login'} text={isAuthChecked && user ? user.name : 'Личный кабинет'} styles='justify-self: end' />
        </NavLink>
      </nav>

    </header>
  )
}

export default AppHeader;

