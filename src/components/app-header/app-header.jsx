import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from "../navigation-button/navigation-button";
import appHeaderStyles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <nav className={appHeaderStyles.navBar}>
        <div className={appHeaderStyles.navWrapper}>
          <NavigationButton type={'constructor'} />
          <NavigationButton type={'orders'} />
        </div>
        <Logo />
        <NavigationButton type={'login'} styles='justify-self: end' />
      </nav>
    </header>
  )
}

export default AppHeader;

