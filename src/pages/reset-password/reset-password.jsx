import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import resetPasswordPageStyles from "../reset-password/reset-password.module.css";
import forgotPasswordPageStyles from "../forgot-password/forgot-password.module.css";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../services/actions/user";

export function ResetPasswordPage () {
  const [passwordValue, setPasswordValue] = useState('')
  const [codeValue, setCodeValue] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRef = useRef(null)
  const onIconClick = () => {
    inputRef.current.focus();
  }

  const handleResetFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword({password: passwordValue, token: codeValue}))
    navigate('/login');
  }

  return(
    <section className={resetPasswordPageStyles.formWrapper}>

      <form onSubmit={handleResetFormSubmit} className={resetPasswordPageStyles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

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
          value={codeValue}
          name={'code'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />

        <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
          Сохранить
        </Button>
      </form>

      <div className={resetPasswordPageStyles.navLinkWrapper}>
        <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
        <NavLink
          to="/login">
          <Button htmlType="button" type="secondary" size="small">
            Войти
          </Button>
        </NavLink>
      </div>
    </section>
  )
}