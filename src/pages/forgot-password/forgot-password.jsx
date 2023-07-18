import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useState} from "react";

export function ForgotPasswordPage () {
  const [emailValue, setEmailValue] = useState('')

  return(
    <>
      <h1>Восстановление пароля</h1>

      <EmailInput
        value={emailValue}
        placeholder={'Укажите e-mail'}
        name={'email'}
        isIcon={false}
      />

      <NavLink
      to="/reset-password" >
        <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
          Восстановить
        </Button>
      </NavLink>

      <p>Вспомнили пароль?</p>
      <NavLink
        to="/login">
        <Button htmlType="button" type="secondary" size="small">
          Войти
        </Button>
      </NavLink>
    </>
  )
}