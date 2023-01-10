import { Logo, ListIcon, BurgerIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className="header" style={{ display: 'flex' }}>
      <nav>
        <a href={"#"} className={"header__link"}>
          <BurgerIcon type={"primary"} />
          Конструктор
        </a>
        <a href={"#"} className={"header__link"}>
          <ListIcon type={"secondary"} />
          Лента заказов
        </a>
        <Logo />
        <a href={"#"} className={"header__link"}>
          <ProfileIcon type={"secondary"} />
          Личный кабинет
        </a>
      </nav>
    </header>
  )
}

export default AppHeader;