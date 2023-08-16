import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, FormEvent, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {updateUserInfo} from "../../services/actions/user";
import profilePageStyles from './profile.module.css'
import {useForm} from "../../services/hooks/useForm";
import {ProfileNavPanel} from "../../components/profile-nav-panel/profile-nav.panel";
import {getUserInfo} from "../../utils/constants";
import {useAppDispatch} from "../../services/hooks/hooks";

export const ProfilePage: FC = () => {
  const user = useSelector(getUserInfo);

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch();

  const {values, handleChange, setValues} = useForm({email: user.email, name: user.name, password: ''});

  useEffect(() => {
    if (user) {
      setValues({email: user.email, name: user.name, password: ''})
    }
  }, [])

  const onIconClick = () => {
     if (inputRef && inputRef.current) {
       inputRef.current.focus();
     }
  }

  const handleUpdateUserInfo = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(updateUserInfo(values))
  }

  const handleCancelChangeUserInfo = (evt: FormEvent) => {
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