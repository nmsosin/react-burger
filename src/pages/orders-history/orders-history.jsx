import ordersHistoryPageStyles from "../orders-history/orders-history.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE, ORDERS_HISTORY_PAGE_ROUTE, PROFILE_PAGE_ROUTE} from "../../utils/routes";
import {SideTab} from "../../components/side-tab/side-tab";
import {OrdersFeedList} from "../../components/orders-feed-list/orders-feed-list";
import {useDispatch, useSelector} from "react-redux";
import {getWsOrders} from "../../utils/constants";
import {useEffect, useState} from "react";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";
import {getCookie} from "../../utils/cookie";
import {logout} from "../../services/actions/user";
import {ProfileNavPanel} from "../../components/profile-nav-panel/profile-nav.panel";

const socketUrl = 'wss://norma.nomoreparties.space/orders/all';

export function OrdersHistoryPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector(getWsOrders);

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

          <OrdersFeedList orders={orders} />
        </section>
      </>
  )
}