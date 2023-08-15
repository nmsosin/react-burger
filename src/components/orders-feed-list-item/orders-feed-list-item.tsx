import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ordersFeedListItem from "../orders-feed-list-item/orders-feed-list-item.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsList} from "../../utils/constants";
import {FC, useMemo} from "react";
import {v4 as uuidv4} from 'uuid';
import { OPEN_CURRENT_ORDER} from "../../services/actions/orderInfo";
import ingredientItemStyles from "../ingredient-item/ingredient-item.module.css";
import {NavLink, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {TIngredient, TOrder} from "../../utils/types";

type TOrdersFeedListItemProps = {
  order: TOrder;
}

export const OrdersFeedListItem: FC<TOrdersFeedListItemProps> = ({order}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {createdAt, ingredients, name, number} = order;
  const ingredientsList = useSelector(getIngredientsList);

  const orderIngredients = useMemo(() => {
    const uniqueOrderIngredients = order.ingredients.reduce((acc: string[], item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item]
    }, [])

    return uniqueOrderIngredients.map((ingredientId) => {
      return ingredientsList.find((item: TIngredient) => {
        return item._id === ingredientId;
      })
    })
  }, [ingredients])

  const orderPrice = useMemo(() => {
    let result = 0;
    orderIngredients.map((item) => {
      return item?.type === 'bun' ? result += item.price * 2 : result += item!.price;
    });
    return result;
  }, [orderIngredients])

  const orderTime = useMemo(() => {
    const currentDate = new Date().getDate();
    return parseInt(createdAt.slice(8, 10)) === currentDate ? `Сегодня, ${createdAt.slice(11, 16)} i-GMT+3` : `${createdAt.slice(0, 10)}, ${createdAt.slice(11, 16)} i-GMT+3`;
    //TODO: refactor with switch case
  }, [orderIngredients])

  const handleOrderCardClick = () => {
    dispatch({type: OPEN_CURRENT_ORDER, payload: order})
  }

  return (
    <NavLink
      to={location.pathname === '/feed' ? `/feed/${order._id}` : `/profile/orders/${order._id}`}
      state={{background: location}}
      className={ingredientItemStyles.navLink}
    >
      <div className={ordersFeedListItem.orderListItem} onClick={handleOrderCardClick}>
        <div className={ordersFeedListItem.orderDescription}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">{orderTime}</p>
        </div>
        <h2 className="text text_type_main-medium">{name}</h2>

        <div className={ordersFeedListItem.orderDetails}>

          <ul className={ordersFeedListItem.ingredientsList}>
            {orderIngredients && orderIngredients.length < 6
              ? orderIngredients.slice(0, 6).map((ingredient) => {
                return (
                  <li className={ordersFeedListItem.imageWrapper} key={uuidv4()}>
                    <div className={ordersFeedListItem.imageBackground}>
                      <img src={ingredient?.image} alt={ingredient?.name}
                           className={ordersFeedListItem.image}
                      />
                    </div>
                  </li>
                )
              })
              : orderIngredients.slice(0, 5).map((ingredient) => {
                  return (
                    <li className={ordersFeedListItem.imageWrapper} key={uuidv4()}>
                      <div className={ordersFeedListItem.imageBackground}>
                        <img src={ingredient?.image} alt={ingredient?.name}
                             className={ordersFeedListItem.image}
                        />
                      </div>
                    </li>
                  )
                }
              )}
            {orderIngredients && orderIngredients.length >= 6 &&
              orderIngredients.slice(5, 6).map((ingredient) => {
                return (
                  <li className={ordersFeedListItem.imageWrapper} key={uuidv4()}>
                    <div className={ordersFeedListItem.lastIngredientOverlay}>
                      <p
                        className={`text text_type_digits-default ${ordersFeedListItem.lastIngredientCounter}`}>+{orderIngredients.length - 5}</p>
                    </div>
                    <div className={ordersFeedListItem.imageBackground}>
                      <img src={ingredient?.image} alt={ingredient?.name}
                           className={ordersFeedListItem.image}
                      />
                    </div>
                  </li>
                )
              })
            }

          </ul>

          <div className={ordersFeedListItem.priceWrapper}>
            <p className="text text_type_digits-default pr-2">{orderPrice}</p>
            <CurrencyIcon type={'primary'}/>
          </div>
        </div>
     </div>
    </NavLink>
  )
}