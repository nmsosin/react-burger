import PropTypes from "prop-types";
import navButtonStyles from './navigation-button.module.css';

const NavigationButton = ({ type, text, icon, isActive }) => {
    return (
    <div className={` p-5 ${navButtonStyles.navLink} `}>
      {icon}
      <p className={`pl-2 text text_type_main-default ${navButtonStyles.text} ${isActive ? navButtonStyles.active :  'text_color_inactive' }`}>{text}</p>
    </div>
  )
}

export default NavigationButton;

NavigationButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.object
}
