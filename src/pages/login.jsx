import { useState, useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from "react-router-dom";

export function LoginPage () {
  const [value, setValue] = useState('value')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return(
    <>
      <h1 className="text text_type_main-medium pt-10 pb-5">Вход</h1>
      <Input
        type={'text'}
        placeholder={'placeholder'}
        onChange={e => setValue(e.target.value)}
        value={value}
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
        placeholder={'placeholder'}
        onChange={e => setValue(e.target.value)}
        icon={'ShowIcon'}
        value={value}
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