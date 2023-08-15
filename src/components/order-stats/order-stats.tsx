import orderStatsStyles from "../order-stats/order-stats.module.css"
import {useSelector} from "react-redux";
import {getWsOrders} from "../../utils/constants";
import {FC, useMemo} from "react";
import {TOrder} from "../../utils/types";

export const OrderStats: FC = () => {
  const { orders, ordersData } = useSelector(getWsOrders);
  // console.log('orders', orders)

  const ordersDoneList = useMemo(() => {
    const ordersDone =  orders?.filter((order: TOrder) => order.status === 'done');
    return ordersDone.length > 10 ? ordersDone.slice(0, 10) : ordersDone;
  }, [orders])

  const ordersPendingList = useMemo(() => {
    const ordersPending = orders.filter((order: TOrder) => order.status === 'pending');
    return ordersPending.length > 10 ? ordersPending.slice(0, 10) : ordersPending;
  }, [orders])

  return (
    <section className={orderStatsStyles.content}>
      <div className={orderStatsStyles.ordersWrapper}>
        <div>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <ul className={orderStatsStyles.ordersList}>
            {ordersDoneList && ordersDoneList.map((order: TOrder) => {
              return <li className="text text_type_digits-default text_color_success" key={order._id}>{order.number}</li>
            })}
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <ul  className={orderStatsStyles.ordersList}>
            {ordersPendingList && ordersPendingList.map((order: TOrder) => {
              return <li className="text text_type_digits-default">{order.number}</li>
            })}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className="text text_type_digits-large">{ordersData?.ordersDoneTotal}</p>
      </div>

      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{ordersData?.ordersDoneToday}</p>
      </div>
    </section>
  )
}