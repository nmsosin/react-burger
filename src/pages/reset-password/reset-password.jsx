import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import resetPasswordPageStyles from "../reset-password/reset-password.module.css";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../services/actions/user";
import {LOGIN_PAGE_ROUTE} from "../../utils/routes";
import {useForm} from "../../services/hooks/useForm";

export function ResetPasswordPage () {
  const {values, handleChange} = useForm({ password: '', token: ''});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetFormSubmit = (evt) => {
    evt.preventDefault();
    dispatch(resetPassword(values))
    navigate(LOGIN_PAGE_ROUTE);
  }

  return(
    <section className={resetPasswordPageStyles.formWrapper}>

      <form onSubmit={handleResetFormSubmit} className={resetPasswordPageStyles.container}>
        <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

        <PasswordInput
          value={values.password}
          name={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
        />

        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token}
          name={'token'}
          error={false}
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