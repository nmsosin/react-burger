import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import forgotPasswordPageStyles from "../forgot-password/forgot-password.module.css";
import {forgotPassword} from "../../services/actions/user";
import {RESET_PASSWORD_PAGE_ROUTE} from "../../utils/routes";
import {useForm} from "../../services/hooks/useForm";
import {FC, FormEvent} from "react";
import {useAppDispatch} from "../../services/hooks/hooks";

export const ForgotPasswordPage: FC = () => {
  const {values, handleChange} = useForm({ email: ''});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(forgotPassword(values));
    navigate(RESET_PASSWORD_PAGE_ROUTE);
  }

  return(
    <section>
      <div className={forgotPasswordPageStyles.formWrapper}>
        <form className={forgotPasswordPageStyles.container} onSubmit={handleResetPassword}>
          <h2 className='text text_type_main-medium'>Восстановление пароля</h2>

          <EmailInput
            value={values.email}
            onChange={handleChange}
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