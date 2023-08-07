import {useDispatch, useSelector} from "react-redux";
import {getWsOrders} from "../../utils/constants";
import {FC, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {WS_CONNECTION_END, WS_CONNECTION_START} from "../../services/actions/websocket";
import {OrderFeedDetailsLayout} from "../orders-feed-details-layout/order-feed-details-layout";
import {getCookie} from "../../utils/cookie";

type TOrdersFeedDetailsProps = {
  isSeparateTab: boolean;
}

export const OrdersFeedDetails: FC<TOrdersFeedDetailsProps> = ({isSeparateTab}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken')?.split('Bearer ')[1]
    const socketUrl = location.pathname.includes('feed') ? 'wss://norma.nomoreparties.space/orders/all' : `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

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

  // useEffect(() => {
  //   dispatch(getOrders());
  // }, [dispatch])

  // const orders = useSelector(getOrdersList)
  const {orders} = useSelector(getWsOrders)


  return (
    <>
      {orders?.length > 0 && (
        <OrderFeedDetailsLayout orders={orders} isSeparateTab={isSeparateTab}/>
      )}
    </>)
}