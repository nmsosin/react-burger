import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import appHeaderStyles from './app-header.module.css';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavLink
            to="/"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'constructor'} />
          </NavLink>

          <NavLink
            to="/register"
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'orders'} />
          </NavLink>
        </div>
        <Logo />

        <NavLink
          to="/profile"
          // activeClassName={appHeaderStyles.active}
        >
          <NavigationButton type={'login'} styles='justify-self: end' />
        </NavLink>
      </nav>

    </header>
  )
}

export default AppHeader;

