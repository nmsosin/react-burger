import {OrderStats} from "../../components/order-stats/order-stats";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import ordersFeedStyles from  "../orders-feed/orders-feed.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getWsOrders} from "../../utils/constants";
import {useEffect} from "react";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";

export function OrdersFeedPage () {
  const dispatch = useDispatch();
  const { orders } = useSelector(getWsOrders);

  useEffect(() => {
    const socketUrl = 'wss://norma.nomoreparties.space/orders/all';
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