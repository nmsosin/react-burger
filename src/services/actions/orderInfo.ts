import request from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import {AppDispatch, TOrder} from "../../utils/types";

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const RESET_CURRENT_ORDER: "RESET_CURRENT_ORDER" = "RESET_CURRENT_ORDER";
export const OPEN_CURRENT_ORDER: "OPEN_CURRENT_ORDER" = "OPEN_CURRENT_ORDER";

interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload?: TOrder[]
}

interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

interface IResetCurrentOrder {
  readonly type: typeof RESET_CURRENT_ORDER;
}

interface IOpenCurrentOrder {
  readonly type: typeof OPEN_CURRENT_ORDER;
  payload?: TOrder;
}

export type TOrderInfoActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IResetCurrentOrder
  | IOpenCurrentOrder

const getOrderRequest = (): IGetOrderRequest => {
  return {
    type: GET_ORDER_REQUEST,
  }
}

const getOrderSuccess = (orders: TOrder[]): IGetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: orders
  }
}

const getOrderFailed = (): IGetOrderFailed => {
  return {
    type: GET_ORDER_FAILED
  }
}

export const getOrders = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    request('orders/all',
      {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      },
    }).then( res  => {
      if (res) {
        dispatch(getOrderSuccess(res.orders))
      } else {
        dispatch(getOrderFailed())
      }
      // console.log('res', res)
    })
      .catch( err => {
        dispatch(getOrderFailed())
        console.log(err);
      })
  }
}