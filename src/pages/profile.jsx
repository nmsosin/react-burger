import {EmailInput, Input, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../services/actions/user";

export function ProfilePage () {
  const [current, setCurrent] = useState('profile')

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const inputRef = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const onLogout = () => {
    dispatch(logout());
    navigate('/login')
  }

  return(
    <>
      <h1 className="text text_type_main-medium pt-10 pb-5">Вход</h1>

      <div style={{ display: 'inline-block' }}>
        <NavLink
          to="/profile"
        >
          <Tab value="profile" active={current === 'profile'} onClick={setCurrent}>
            Профиль
          </Tab>
        </NavLink>
        <NavLink
          to="/profile/orders"
        >
          <Tab value="orders-history" active={current === 'orders-history'} onClick={setCurrent}>
            История заказов
          </Tab>
        </NavLink>
        <NavLink
          to="/"
        >
          <Tab value="exit" active={current === 'exit'} onClick={onLogout}>
            Выход
          </Tab>
        </NavLink>
      </div>

      <EmailInput
        value={emailValue}
        name={'Логин'}
        isIcon={true}
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

      <p>В этом разделе вы можете изменить свои персональные данные</p>
    </>
  )
}