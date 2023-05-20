import { useState, useRef } from 'react';
import {EmailInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from "react-router-dom";

export function LoginPage () {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return(
    <>
      <h1 className="text text_type_main-medium pt-10 pb-5">Вход</h1>
      <EmailInput
        value={emailValue}
        name={'email'}
        isIcon={false}
      />

      <Input
        type={'text'}
        placeholder={'placeholder'}
        onChange={e => setPasswordValue(e.target.value)}
        icon={'ShowIcon'}
        value={passwordValue}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      <p>Вы — новый пользователь?</p>
      <NavLink to={"/register"}>
        <p>Зарегистрироваться</p>
      </NavLink>
      <p>Забыли пароль?</p>
      <NavLink to={"/reset-password"}>
        <p>Восстановить пароль</p>
      </NavLink>
    </>
  )
}