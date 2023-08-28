import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, FormEvent, useRef} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {register} from '../../services/actions/user'
import registerPageStyles from './register.module.css';
import {LOGIN_PAGE_ROUTE} from "../../utils/routes";
import {useForm} from "../../services/hooks/useForm";
import {useAppDispatch} from "../../services/hooks/hooks";

export const RegisterPage: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const onIconClick = () => {
    if (formRef && formRef.current) {
      formRef.current.focus()
    }
  }

  const dispatch = useAppDispatch();

  const {values, handleChange} = useForm({name: '', email: '', password: ''});

  const navigate = useNavigate();


  const handleRegisterSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    // console.log(Object.fromEntries(new FormData(evt.target)))
    dispatch(register( values));
    navigate(LOGIN_PAGE_ROUTE)
  }

  return(
    <>
      <div className={registerPageStyles.formWrapper}>
        <form onSubmit={handleRegisterSubmit} ref={formRef} className={registerPageStyles.container}>
          <h2 className='text text_type_main-medium'>Регистрация</h2>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            isIcon={false}
          />

          <Input
            type={'text'}
            placeholder={'Пароль'}
            onChange={handleChange}
            icon={'ShowIcon'}
            value={values.password}
            name={'password'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>

        <div className={registerPageStyles.navLinkWrapper}>
          <p className='text text_type_main-small text_color_inactive'>Уже зарегистрированы?</p>
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