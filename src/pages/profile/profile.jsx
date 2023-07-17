import {EmailInput, Input, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/user";
import profilePageStyles from './profile.module.css'
import {SideTab} from "../../components/side-tab/side-tab";

export function ProfilePage () {
  const [current, setCurrent] = useState('profile')

  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const inputRef = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onLogout = () => {
    dispatch(logout(() => navigate('/login')));
  }

  return(
    <>
      <div className={profilePageStyles.profilePageWrapper}>
        <div className={profilePageStyles.navPanel}>
           <div style={{ display: 'inline-block' }}>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/profile"
            >
              <SideTab value="Профиль" active={current === 'profile'} onClick={setCurrent} >
                Профиль
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/profile/orders"
            >
              <SideTab value="История заказов" active={current === 'orders-history'} onClick={setCurrent}>
                История заказов
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/"
            >
              <SideTab value="Выход" active={current === 'exit'} onClick={onLogout}>
                Выход
              </SideTab>
            </NavLink>
          </div>

          <p className={'text text_type_main-small text_color_inactive pt-20'}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

        <div className={profilePageStyles.inputContainer}>
          <EmailInput
            value={emailValue}
            name={'Логин'}
            isIcon={true}
          />

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            icon={'EditIcon'}
            value={nameValue}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Input
            type={'text'}
            placeholder={'Пароль'}
            onChange={e => setPasswordValue(e.target.value)}
            icon={'EditIcon'}
            value={passwordValue}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
      </div>
    </>
  )
}