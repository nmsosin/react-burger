import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {FC, useEffect, useState} from "react";
import {getUserAuth, getUserInfo} from "../../utils/constants";
import {
  MAIN_PAGE_ROUTE,
  ORDERS_FEED_PAGE_ROUTE,
  ORDERS_HISTORY_PAGE_ROUTE,
  PROFILE_PAGE_ROUTE
} from "../../utils/routes";

const AppHeader:FC = () => {
  const user = useSelector(getUserInfo);
  const isAuthChecked = useSelector(getUserAuth);
  const [activeTab, setActiveTab] = useState<string>(MAIN_PAGE_ROUTE);
  const location = useLocation();
  const currentUrlEndpoint = location.pathname;

  useEffect(() => {
    setActiveTab(currentUrlEndpoint)
  }, [currentUrlEndpoint])


  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavLink
            to={MAIN_PAGE_ROUTE}
            onClick={() => setActiveTab(MAIN_PAGE_ROUTE)}
            className={appHeaderStyles.navLink}
          >
            <NavigationButton
              isActive={currentUrlEndpoint === MAIN_PAGE_ROUTE}
              text='Конструктор'
              icon = <BurgerIcon type={activeTab === MAIN_PAGE_ROUTE ? "primary" : "secondary"} />
            />
          </NavLink>

          <NavLink
            to={ORDERS_FEED_PAGE_ROUTE}
            onClick={() => setActiveTab(ORDERS_FEED_PAGE_ROUTE)}
            className={appHeaderStyles.navLink}
          >
            <NavigationButton
              isActive={currentUrlEndpoint === ORDERS_FEED_PAGE_ROUTE}
              text='Лента заказов'
              icon = <ListIcon type={activeTab === ORDERS_FEED_PAGE_ROUTE ? "primary" : "secondary"} />
            />
          </NavLink>
        </div>
        <Logo />

        <NavLink
          to={PROFILE_PAGE_ROUTE}
          onClick={() => setActiveTab(PROFILE_PAGE_ROUTE)}
          className={appHeaderStyles.navLink}
        >
          <NavigationButton isActive={currentUrlEndpoint === PROFILE_PAGE_ROUTE || currentUrlEndpoint === ORDERS_HISTORY_PAGE_ROUTE}
                            text={isAuthChecked && user && user.name ? user.name : 'Личный кабинет'}
                            icon = <ProfileIcon type={activeTab === PROFILE_PAGE_ROUTE || activeTab === ORDERS_HISTORY_PAGE_ROUTE ? "primary" : "secondary"} />
          />
        </NavLink>
      </nav>

    </header>
  )
}

export default AppHeader;

