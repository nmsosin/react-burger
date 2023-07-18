import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import forgotPasswordPageStyles from "../forgot-password/forgot-password.module.css";

export function ForgotPasswordPage () {
  const [emailValue, setEmailValue] = useState('')

  return(
    <section>
      <div className={forgotPasswordPageStyles.formWrapper}>
        <div className={forgotPasswordPageStyles.container}>
          <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

          <EmailInput
            value={emailValue}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
          />

          <NavLink
          to="/reset-password" >
            <Button htmlType="button" type="primary" size="medium">
              Восстановить
            </Button>
          </NavLink>
        </div>

        <div className={forgotPasswordPageStyles.navLinkWrapper}>
          <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль?</p>
          <NavLink
            to="/login">
            <Button htmlType="button" type="secondary" size="small">
              Войти
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}