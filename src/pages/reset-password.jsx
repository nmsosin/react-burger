import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";

export function ResetPasswordPage () {
  const [passwordValue, setPasswordValue] = useState('')
  const [codeValue, setCodeValue] = useState('')

  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  }

  return(
    <section>
      <h1>Восстановление пароля</h1>

      <form onSubmit={handleFormSubmit}></form>
      <Input
        type={'text'}
        placeholder={'Введите новый пароль'}
        onChange={e => setPasswordValue(e.target.value)}
        icon={'ShowIcon'}
        value={passwordValue}
        name={'password'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />

      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setCodeValue(e.target.value)}
        isIcon={false}
        value={codeValue}
        name={'code'}
        error={false}
        ref={inputRef}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />

      <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
        Сохранить
      </Button>

      <p>Вспомнили пароль?</p>
      <NavLink
        to="/login">
        <Button htmlType="button" type="secondary" size="small">
          Войти
        </Button>
      </NavLink>
    </section>
  )
}