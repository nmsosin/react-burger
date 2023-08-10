import {TOrder} from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START'  = 'WS_CONNECTION_START';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_FAILED: 'WS_CONNECTION_FAILED' = 'WS_CONNECTION_FAILED';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_ORDERS: 'WS_SEND_ORDERS' = 'WS_SEND_ORDERS';

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsConnectionEnd {
  readonly type: typeof WS_CONNECTION_END;
  payload?: Event;
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload?: Event;
}

interface IWsConnectionFailed {
  readonly type: typeof WS_CONNECTION_FAILED;
  payload?: Event;
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload?: Event;
}

interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  payload: string[]
}

interface IWsSendOrders {
  readonly type: typeof WS_SEND_ORDERS;
  payload?: TOrder;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionEnd
  | IWsConnectionSuccess
  | IWsConnectionFailed
  | IWsConnectionClosed
  | IWsGetOrders
  | IWsSendOrders

export type TWebSocketActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly wsEnd: typeof WS_CONNECTION_END;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_FAILED;
  readonly onMessage: typeof WS_GET_ORDERS;
  readonly sendMessage: typeof WS_SEND_ORDERS;
}

export const wsActions: TWebSocketActions = {
  wsInit: WS_CONNECTION_START,
  wsEnd: WS_CONNECTION_END,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_FAILED,
  onMessage: WS_GET_ORDERS,
  sendMessage: WS_SEND_ORDERS
};