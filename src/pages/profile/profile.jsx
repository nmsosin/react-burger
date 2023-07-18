import {Button, EmailInput, Input, PasswordInput, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUserInfo} from "../../services/actions/user";
import profilePageStyles from './profile.module.css'
import {SideTab} from "../../components/side-tab/side-tab";

export function ProfilePage () {
  const user = useSelector((store) => store.user.user);
  const [current, setCurrent] = useState('profile')

  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const inputRef = useRef(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('password', user.password)
      setFormValues({email: user.email, name: user.name, password: 'Введите новый пароль'})
    }
  }, [])

  const onIconClick = () => {
     inputRef.current.focus();
  }

  const onLogout = () => {
    dispatch(logout(() => navigate('/login')));
  }

  const [formValues, setFormValues] = useState( { email: '', name: '', password: ''})

  const handleInputChange = (evt) => {
    console.log('evt.target', evt.target)
    const { name, value  } = evt.target;
    setFormValues({ ...formValues, [name]: value})
  }

  const handleUpdateUserInfo = (evt) => {
    evt.preventDefault();
    console.log('formValues', formValues)
    dispatch(updateUserInfo(formValues))
  }

  return(
    <>
      <div className={profilePageStyles.profilePageWrapper}>
        <div className={profilePageStyles.navPanel}>
           <div style={{ display: 'inline-block' }}>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/profile"
            >
              <SideTab value="Профиль" active={current === 'profile'} onClick={setCurrent} >
                Профиль
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/profile/orders"
            >
              <SideTab value="История заказов" active={current === 'orders-history'} onClick={setCurrent}>
                История заказов
              </SideTab>
            </NavLink>
            <NavLink
              className={`text text_type_main-medium text_color_inactive ${profilePageStyles.navLink}`}
              to="/"
            >
              <SideTab value="Выход" active={current === 'exit'} onClick={onLogout}>
                Выход
              </SideTab>
            </NavLink>
          </div>

          <p className={'text text_type_main-default text_color_inactive pt-20'} style={ { opacity: .4 } }>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
        </div>

        <form className={profilePageStyles.inputContainer} onSubmit={handleUpdateUserInfo}>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            icon={'EditIcon'}
            value={formValues.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <EmailInput
            value={formValues.email}
            name={'email'}
            isIcon={true}
            onChange={handleInputChange}
          />

          <PasswordInput
            onChange={handleInputChange}
            value={formValues.password}
            name={'password'}
            icon={'EditIcon'}
          />

          <div className={profilePageStyles.actionButtonsWrapper}>
            <Button htmlType="button" type="secondary" size="medium">
              Отмена
            </Button>

            <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
              Сохранить
            </Button>
          </div>

        </form>
      </div>
    </>
  )
}