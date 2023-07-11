import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {REGISTER_REQUEST} from "../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {register} from '../services/actions/user'

export function RegisterPage () {
  const formRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => formRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const user = useSelector(state => state.user)

  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const navigate = useNavigate();

  // const onEmailChange = e => {
  //   setEmailValue(e.target.value)
  //   console.log(user)
  // }

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    // console.log(Object.fromEntries(new FormData(evt.target)))
    dispatch(register( {nameValue, emailValue, passwordValue}));
    navigate('/login')
    console.log(user)
  }

  return(
    <>
      <form onSubmit={handleRegisterSubmit} ref={formRef}>
        <h1>Регистрация</h1>

        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          icon={'CurrencyIcon'}
          value={nameValue}
          name={'name'}
          error={false}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <EmailInput
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
        />

        <Input
          type={'text'}
          placeholder={'Пароль'}
          onChange={e => setPasswordValue(e.target.value)}
          icon={'CurrencyIcon'}
          value={passwordValue}
          name={'password'}
          error={false}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
          Зарегистрироваться
        </Button>
      </form>

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