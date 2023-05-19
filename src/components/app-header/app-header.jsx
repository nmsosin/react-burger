import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import appHeaderStyles from './app-header.module.css';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <Link
            to={{ pathname: `/` }}
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'constructor'} />
          </Link>

          <Link
            to={{ pathname: `/register` }}
            // activeClassName={appHeaderStyles.active}
          >
            <NavigationButton type={'orders'} />
          </Link>
        </div>
        <Logo />

        <Link
          to={{ pathname: `/profile` }}
          // activeClassName={appHeaderStyles.active}
        >
          <NavigationButton type={'login'} styles='justify-self: end' />
        </Link>
      </nav>

    </header>
  )
}

export default AppHeader;

