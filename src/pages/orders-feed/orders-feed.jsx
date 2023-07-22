import {OrderStats} from "../../components/order-stats/order-stats";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import ordersFeedStyles from  "../orders-feed/orders-feed.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getWsOrders} from "../../utils/constants";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/websocket";

export function OrdersFeedPage () {
  const dispatch = useDispatch();
  const { data } = useSelector(getWsOrders);

  useEffect(() => {
    console.log(data)
  },[])

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch])

  return(
    <section>
      <h1>Лента заказов</h1>
      <div className={ordersFeedStyles.content}>
        <OrdersFeedList />
        <OrderStats/>
      </div>
    </section>
  )
}