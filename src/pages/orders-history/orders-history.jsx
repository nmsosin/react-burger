import ordersHistoryPageStyles from "../orders-history/orders-history.module.css";
import {useNavigate} from "react-router-dom";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import {useDispatch, useSelector} from "react-redux";
import {getWsAuthOrders} from "../../utils/constants";
import {useEffect, useMemo} from "react";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";
import {getCookie} from "../../utils/cookie";
import {ProfileNavPanel} from "../../components/profile-nav-panel/profile-nav.panel";

const socketUrl = 'wss://norma.nomoreparties.space/orders';

export function OrdersHistoryPage () {
  const dispatch = useDispatch();
  const { authOrders } = useSelector(getWsAuthOrders);

  const fromOldToNewOrders = useMemo(() => {
    return authOrders.toReversed();
  }, [authOrders])

  const accessToken = getCookie('accessToken').split('Bearer ')[1];

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${socketUrl}?token=${accessToken}`
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