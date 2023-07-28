import {Button, EmailInput, Input, PasswordInput, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUserInfo} from "../../services/actions/user";
import profilePageStyles from './profile.module.css'
import {SideTab} from "../../components/side-tab/side-tab";
import {LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE, ORDERS_HISTORY_PAGE_ROUTE, PROFILE_PAGE_ROUTE} from "../../utils/routes";
import {useForm} from "../../services/hooks/useForm";
import {ProfileNavPanel} from "../../components/profile-nav-panel/profile-nav.panel";

export function ProfilePage () {
  const user = useSelector((store) => store.user.user);

  const inputRef = useRef(null)

  const dispatch = useDispatch();

  const {values, handleChange, setValues} = useForm({email: user.email, name: user.name, password: ''});

  useEffect(() => {
    if (user) {
      setValues({email: user.email, name: user.name, password: ''})
    }
  }, [])

  const onIconClick = () => {
     inputRef.current.focus();
  }

  const handleUpdateUserInfo = (evt) => {
    evt.preventDefault();
    dispatch(updateUserInfo(values))
  }

  const handleCancelChangeUserInfo = (evt) => {
    evt.preventDefault();
    setValues({email: user.email, name: user.name, password: ''});
  }

  return(
    <>
      <section className={profilePageStyles.profilePageWrapper}>
        <ProfileNavPanel />

        <form className={profilePageStyles.inputContainer} onSubmit={handleUpdateUserInfo}>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            icon={'EditIcon'}
            value={values.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <EmailInput
            value={values.email}
            name={'email'}
            isIcon={true}
            onChange={handleChange}
          />

          <PasswordInput
            onChange={handleChange}
            value={values.password}
            name={'password'}
            icon={'EditIcon'}
          />

          <div className={profilePageStyles.actionButtonsWrapper}>
            <Button htmlType="button" type="secondary" size="medium" onClick={handleCancelChangeUserInfo}>
              Отмена
            </Button>

            <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
              Сохранить
            </Button>
          </div>

        </form>
      </section>
    </>
  )
}