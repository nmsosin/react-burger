import { useState, useRef } from 'react';
import {Button, EmailInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../services/actions/user";
import {useAuth} from "../utils/auth";

export function LoginPage () {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const formRef = useRef(null);
  const dispatch = useDispatch();
  let auth = useAuth();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user.user)

  const onIconClick = () => {
    setTimeout(() => formRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  // const onEmailChange = e => {
  //   setEmailValue(e.target.value)
  //   console.log(emailValue, passwordValue)
  // }

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    // console.log(Object.fromEntries(new FormData(evt.target)))
    dispatch(login({emailValue, passwordValue}))
    console.log(user)
    navigate('/');
  }

  // if (auth.user) {
  //
  // }


  return(
    <>
      <form onSubmit={handleLoginSubmit} ref={formRef}>
        <h1 className="text text_type_main-medium pt-10 pb-5">Вход</h1>
        <EmailInput
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          isIcon={false}
        />

        <Input
          type={'text'}
          placeholder={'Password'}
          onChange={e => setPasswordValue(e.target.value)}
          icon={'ShowIcon'}
          value={passwordValue}
          name={'password'}
          error={false}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <Button htmlType="submit" type="primary" size="small" extraClass="ml-2">
          Войти
        </Button>
      </form>

      <p>Вы — новый пользователь?</p>
      <NavLink to={"/register"}>
        <p>Зарегистрироваться</p>
      </NavLink>
      <p>Забыли пароль?</p>
      <NavLink to={"/forgot-password"}>
        <p>Восстановить пароль</p>
      </NavLink>
    </>
  )
}