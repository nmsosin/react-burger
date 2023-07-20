import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';
import {Link, NavLink, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";

const AppHeader = () => {
  const user = useSelector((store) => store.user.user);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const [activeTab, setActiveTab] = useState('constructor');

  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavLink
            to="/"
            onClick={() => setActiveTab('constructor')}
            className={appHeaderStyles.navLink}
          >
            <NavigationButton isActive={activeTab === 'constructor'} type={'constructor'} text='Конструктор' icon = <BurgerIcon type={activeTab === "constructor" ? "primary" : "secondary"} /> />
          </NavLink>

          <NavLink
            to="/profile/orders/:id"
            onClick={() => setActiveTab('orders')}
            className={appHeaderStyles.navLink}
          >
            <NavigationButton isActive={activeTab === 'orders'} type={'orders'} text='Лента заказов' icon = <ListIcon type={activeTab === "orders" ? "primary" : "secondary"} /> />
          </NavLink>
        </div>
        <Logo />

        <NavLink
          to="/profile"
          onClick={() => setActiveTab('login')}
          className={appHeaderStyles.navLink}
        >
          <NavigationButton isActive={activeTab === 'login'} type={'login'} text={isAuthChecked && user && user.name ? user.name : 'Личный кабинет'} styles='justify-self: end' icon = <ProfileIcon type={activeTab === "login" ? "primary" : "secondary"} /> />
        </NavLink>
      </nav>

    </header>
  )
}

export default AppHeader;

