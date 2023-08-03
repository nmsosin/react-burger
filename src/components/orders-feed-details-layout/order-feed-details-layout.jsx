import ordersFeedDetailsLayout from "../orders-feed-details-layout/orders-feed-details-layout.module.css";
import {v4 as uuidv4} from "uuid";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {getIngredientsList} from "../../utils/constants";
import {useMemo} from "react";
import {useParams} from "react-router-dom";

export function OrderFeedDetailsLayout({orders, isSeparateTab}) {
  const {id} = useParams();
  const order = orders.find((order) => order._id === id);

  const {createdAt, ingredients, name, number, status, updatedAt, _id} = order;
  const ingredientsList = useSelector(getIngredientsList);

  const orderIngredients = useMemo(() => {
    return ingredients.map((ingredientId) => {
      return ingredientsList.find((item) => {
        return item._id === ingredientId;
      })
    })
  }, [ingredients]);

  const uniqueOrderIngredients = useMemo(() => {
    return orderIngredients.reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item]
    }, [])
  }, [orderIngredients])

  const orderPrice = useMemo(() => {
    let result = 0;
    orderIngredients.map(item => {
      return item.type === 'bun' ? result += item.price * 2 : result += item.price;
    });
    return result;
  }, [orderIngredients])

  const orderTime = useMemo(() => {
    const currentDate = new Date().getDate();
    return createdAt.slice(8, 10) == currentDate ? `Сегодня, ${createdAt.slice(11, 16)} i-GMT+3` : `${createdAt.slice(0, 10)}, ${createdAt.slice(11, 16)} i-GMT+3`;
    //TODO: refactor with switch case ?
  }, [orderIngredients])

  return (
    <div className={isSeparateTab ? ordersFeedDetailsLayout.separateTabWrapper : null}>
      <div className={ordersFeedDetailsLayout.orderItem}>
        <p className="text text_type_digits-default pb-10">#{number}</p>
        <h2 className="text text_type_main-medium pb-3">{name}</h2>
        <p
          className={`text text_type_main-default pb-15 ${status === "done" ? "text_color_success" : ""}`}>{status === "done" ? "Выполнен" : "В работе"}</p>
        <p className="text text_type_main-medium pb-6">Состав:</p>

        <div className={ordersFeedDetailsLayout.orderDetails}>

          <ul className={ordersFeedDetailsLayout.ingredientsList}>
            {
              uniqueOrderIngredients.map((ingredient) => {
                const counter = orderIngredients.reduce((acc, item) => {
                  acc[item._id] = (acc[item._id] || 0) + 1;
                  return acc;
                }, {});

                return (
                  <li key={uuidv4()} className={ordersFeedDetailsLayout.ingredientCard}>
                    <div className={ordersFeedDetailsLayout.imageWrapper}>
                      <div className={ordersFeedDetailsLayout.imageBackground}>
                        <img src={ingredient.image} alt={ingredient.name}
                             className={ordersFeedDetailsLayout.image}
                        />
                      </div>

                    </div>
                    <p className="text text_type_main-default">{ingredient.name}</p>
                    <div className={ordersFeedDetailsLayout.priceWrapper}>
                      <p className="text text_type_digits-default pr-2">
                        {ingredient.type === 'bun' ? counter[ingredient._id] * 2 : counter[ingredient._id]} x {ingredient.price}
                      </p>
                      <CurrencyIcon/>
                    </div>
                  </li>
                )
              })
            }

          </ul>

          <div className={`pt-10 ${ordersFeedDetailsLayout.orderDescription}`}>
            <p className="text text_type_main-default text_color_inactive">{orderTime}</p>
            <div className={ordersFeedDetailsLayout.priceWrapper}>
              <p className="text text_type_digits-default pr-2">{orderPrice}</p>
              <CurrencyIcon type={'primary'}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}