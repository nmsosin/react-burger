import PropTypes from "prop-types";
import navButtonStyles from './navigation-button.module.css';
import {BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const NavigationButton = ({ type, text, icon }) => {

  // switch (type) {
  //   case 'constructor':
  //     icon = <BurgerIcon type={"primary"} />
  //     text = 'Конструктор'
  //     break;
  //   case 'orders':
  //     icon = <ListIcon type={"secondary"} />
  //     text = 'Лента заказов';
  //     break;
  //   case 'login':
  //     icon = <ProfileIcon type={"secondary"} />
  //     text = 'Личный кабинет';
  //     break;
  // }

  return (
    <div className={`text text_type_main-default text_color_inactive p-5 ${navButtonStyles.navLink}`}>
      {icon}
      <p className={`pl-2 ${navButtonStyles.text}`}>{text}</p>
    </div>
  )
}

export default NavigationButton;

NavigationButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string
}
