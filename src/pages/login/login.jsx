import { useState, useRef } from 'react';
import {Button, EmailInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../services/actions/user";
import {useAuth} from "../../utils/auth";
import loginPageStyles from './login.module.css';

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
    // console.log(user)
    // navigate('/');
  }


  return(
    <>
      <div className={loginPageStyles.formWrapper}>
        <form onSubmit={handleLoginSubmit} ref={formRef} className={loginPageStyles.container}>
          <h2 className='text text_type_main-medium'>Вход</h2>
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

          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>

        <div className={loginPageStyles.navLinkWrapper}>
          <div className={loginPageStyles.questionWrapper}>
            <p className='text text_type_main-small text_color_inactive'>Вы — новый пользователь?</p>
            <NavLink to={"/register"}>
              <Button htmlType="button" type="secondary" size="small">Зарегистрироваться</Button>
            </NavLink>
          </div>
          <div className={loginPageStyles.questionWrapper}>
            <p className='text text_type_main-small text_color_inactive'>Забыли пароль?</p>
            <NavLink to={"/forgot-password"}>
              <Button htmlType="button" type="secondary" size="small">Восстановить пароль</Button>
            </NavLink>
          </div>

        </div>
      </div>
    </>
  )
}