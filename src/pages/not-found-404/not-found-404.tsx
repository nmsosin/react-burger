import notFoundPageStyles from './not-found-404.module.css'
import {FC} from "react";

export const NotFound404: FC = () => {
  return(
    <div className={`${notFoundPageStyles.contentWrapper} pt-30`} >
      <h1 className='text text_type_main-large pt-20 pb-10'>Ой! Произошла галактическая ошибка 404</h1>
      <p className='text text_type_main-medium text_color_inactive pt-10 pb-10'>Такой страницы не существует</p>
    </div>
  )
}