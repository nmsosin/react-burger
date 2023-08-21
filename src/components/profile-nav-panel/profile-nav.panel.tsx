import {FC, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {logout, setAuthChecked} from "../../services/actions/user";
import {LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE, ORDERS_HISTORY_PAGE_ROUTE, PROFILE_PAGE_ROUTE} from "../../utils/routes";
import profileNavPanelStyles from "../profile-nav-panel/profile-nav-panel.module.css";
import {SideTab} from "../side-tab/side-tab";
import {useAppDispatch} from "../../services/hooks/hooks";

export const ProfileNavPanel: FC = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(PROFILE_PAGE_ROUTE)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout(() => navigate(LOGIN_PAGE_ROUTE)));
    setAuthChecked(false);
  }

  return(
    <>
        <div className={profileNavPanelStyles.navPanel}>
          <div style={{ display: 'inline-block' }}>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profileNavPanelStyles.navLink}`}
              to={PROFILE_PAGE_ROUTE}
            >
              <SideTab value="Профиль" active={location.pathname === PROFILE_PAGE_ROUTE} onClick={() => setCurrent}>
                Профиль
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profileNavPanelStyles.navLink}`}
              to={ORDERS_HISTORY_PAGE_ROUTE}
            >
              <SideTab value="История заказов" active={location.pathname === ORDERS_HISTORY_PAGE_ROUTE} onClick={() =>setCurrent}>
                История заказов
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profileNavPanelStyles.navLink}`}
              to={MAIN_PAGE_ROUTE}
            >
              <SideTab value="Выход" active={current === 'exit'} onClick={onLogout}>
                Выход
              </SideTab>
            </NavLink>
          </div>

          <p className={'text text_type_main-default text_color_inactive pt-20'} style={ { opacity: .4 } }>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>
    </>
  )
}