import {OrderStats} from "../../components/order-stats/order-stats";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import ordersFeedStyles from  "../orders-feed/orders-feed.module.css"
import {getWsOrders, SOCKET_URL} from "../../utils/constants";
import {FC, useEffect} from "react";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

export const OrdersFeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector(getWsOrders);

  useEffect(() => {
    const socketUrl = `${SOCKET_URL}/orders/all`;
    dispatch({
      type: WS_CONNECTION_START,
      payload: socketUrl
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_END,
      });
    };
  }, [dispatch])

  return(
    <section className={ordersFeedStyles.section}>
      <h1 className="text text_type_main-large pb-5 pt-10">Лента заказов</h1>
      <div className={ordersFeedStyles.content}>
        <OrdersFeedList orders={orders} />
        <OrderStats />
      </div>
    </section>
  )
}