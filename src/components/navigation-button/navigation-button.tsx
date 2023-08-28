import navButtonStyles from './navigation-button.module.css';
import {FC, ReactNode} from "react";
type TNavigationButtonProps = {
  text: string;
  icon: ReactNode;
  isActive: boolean;
}
const NavigationButton: FC<TNavigationButtonProps> = ({ text, icon, isActive }) => {
    return (
    <div className={` p-5 ${navButtonStyles.navLink} `}>
      {icon}
      <p className={`pl-2 text text_type_main-default ${navButtonStyles.text} ${isActive ? navButtonStyles.active :  'text_color_inactive' }`}>{text}</p>
    </div>
  )
}

export default NavigationButton;
