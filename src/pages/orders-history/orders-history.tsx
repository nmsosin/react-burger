import ordersHistoryPageStyles from "../orders-history/orders-history.module.css";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import {useDispatch, useSelector} from "react-redux";
import {getWsAuthOrders, SOCKET_URL} from "../../utils/constants";
import {FC, useEffect, useMemo} from "react";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";
import {getCookie} from "../../utils/cookie";
import {ProfileNavPanel} from "../../components/profile-nav-panel/profile-nav.panel";

export const OrdersHistoryPage: FC = () => {
  const dispatch = useDispatch();
  const { authOrders } = useSelector(getWsAuthOrders);

  const fromOldToNewOrders = useMemo(() => {
    return [...authOrders].reverse();
  }, [authOrders])

  const accessToken = getCookie('accessToken')?.split('Bearer ')[1];

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${SOCKET_URL}/orders?token=${accessToken}`
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_END,
      });
    };
  }, [dispatch])

  return(
      <>
        <section className={ordersHistoryPageStyles.profilePageWrapper}>
          <ProfileNavPanel />

          <OrdersFeedList orders={fromOldToNewOrders} />
        </section>
      </>
  )
}