import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {REGISTER_REQUEST} from "../../services/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {register} from '../../services/actions/user'
import registerPageStyles from './register.module.css';

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
      <div className={registerPageStyles.formWrapper}>
        <form onSubmit={handleRegisterSubmit} ref={formRef} className={registerPageStyles.container}>
          <h2 className='text text_type_main-medium'>Регистрация</h2>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            value={nameValue}
            name={'name'}
            error={false}
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
            icon={'ShowIcon'}
            value={passwordValue}
            name={'password'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
            Зарегистрироваться
          </Button>
        </form>

        <div className={registerPageStyles.navLinkWrapper}>
          <p className='text text_type_main-small text-color-inactive'>Уже зарегистрированы?</p>
          <NavLink
            to="/login">
            <Button htmlType="button" type="secondary" size="small" >
              Войти
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}