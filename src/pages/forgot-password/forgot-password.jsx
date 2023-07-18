import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import forgotPasswordPageStyles from "../forgot-password/forgot-password.module.css";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../services/actions/user";

export function ForgotPasswordPage () {
  const [emailValue, setEmailValue] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEmailChange = (evt) => {
    setEmailValue(evt.target.value)
  }

  const handleResetPassword = (evt) => {
    evt.preventDefault();
    console.log(emailValue)
    dispatch(forgotPassword({email: emailValue}))
    navigate('/reset-password')
  }

  return(
    <section>
      <div className={forgotPasswordPageStyles.formWrapper}>
        <form className={forgotPasswordPageStyles.container} onSubmit={handleResetPassword}>
          <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

          <EmailInput
            value={emailValue}
            onChange={onEmailChange}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>

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