import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import {Link, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const AppHeader = () => {
  const user = useSelector((store) => store.user.user)
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked)

  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavLink
            to="/"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'constructor'} text='Конструктор' icon = <BurgerIcon type={"primary"} /> />
          </NavLink>

          <NavLink
            to="/profile/orders/:id"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'orders'} text='Лента заказов' icon = <ListIcon type={"secondary"} /> />
          </NavLink>
        </div>
        <Logo />

        <NavLink
          to="/profile"
          // activeClassName={appHeaderStyles.active}
        >
          <NavigationButton type={'login'} text={isAuthChecked && user ? user.name : 'Личный кабинет'} styles='justify-self: end' icon = <ProfileIcon type={"secondary"} /> />
        </NavLink>
      </nav>

    </header>
  )
}

export default AppHeader;

