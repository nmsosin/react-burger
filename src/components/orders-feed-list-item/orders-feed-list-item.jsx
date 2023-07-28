import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ordersFeedListItem from "../orders-feed-list-item/orders-feed-list-item.module.css"

export function OrdersFeedListItem() {

  return (
    <div className={ordersFeedListItem.orderListItem}>
      <div className={ordersFeedListItem.orderDescription}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive"> Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h2 className="text text_type_main-medium">Death Star Starship Main Burger</h2>

      <div className={ordersFeedListItem.orderDetails}>
        <ul className={ordersFeedListItem.ingredientsList}>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "5"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/bun-01.png" alt="ingredient"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "4"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/cheese-large.png" alt="ingredient"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "3"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/salad-large.png" alt="ingredient"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "2"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/meat-01.png" alt="ingredient"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "1"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/meat-03-large.png"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>
          <li className={ordersFeedListItem.imageWrapper} style={{zIndex: "0"}} >
            <div className={ordersFeedListItem.imageBackground}>
              <img src="https://code.s3.yandex.net/react/code/sauce-01-large.png" alt="ingredient"
                   className={ordersFeedListItem.image}
              />
            </div>
          </li>

        </ul>

        <div className={ordersFeedListItem.priceWrapper}>
          <p className="text text_type_digits-default pr-2">460</p>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>
    </div>
  )
}