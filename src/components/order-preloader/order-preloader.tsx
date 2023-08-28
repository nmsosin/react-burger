import React, {FC} from "react";
import OrderPreloaderStyles from './order-preloader.module.css'

type TOrderPreloader = {
  text: string;
  description: string;
}
export const OrderPreloader: FC<TOrderPreloader> = ({text, description}) => {
  return (
    <div  className={OrderPreloaderStyles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">{text}</h1>
      <p className={'text text_type_main-default text_color_inactive pb-30'}>{description}</p>
      <div className={OrderPreloaderStyles.loader}>
      </div>
    </div>
  )
}