import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import {NavLink} from "react-router-dom";

export function RegisterPage () {
  const [inputValue, setInputValue] = useState('value')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [emailValue, setEmailValue] = useState('bob@example.com')
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  return(
    <>
      <h1>Регистрация</h1>

      <Input
        type={'text'}
        placeholder={'placeholder'}
        onChange={e => setInputValue(e.target.value)}
        icon={'CurrencyIcon'}
        value={inputValue}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />

      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={'email'}
        isIcon={false}
      />

      <Button htmlType="button" type="primary" size="small" extraClass="ml-2">
        Зарегистрироваться
      </Button>

      <p>Уже зарегистрированы?</p>
      <NavLink
        to="/login">
        <Button htmlType="button" type="secondary" size="small">
          Войти
        </Button>
      </NavLink>
    </>
  )
}