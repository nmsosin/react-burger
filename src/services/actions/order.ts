import request from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import {AppDispatch, TOrder} from "../../utils/types";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";

export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}

interface ISendOrderSuccess {
  readonly type: typeof SEND_ORDER_SUCCESS;
  payload: number;
}

interface ISendOrderFailed {
  readonly type: typeof SEND_ORDER_FAILED;
}

interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export type TOrderActions =
  | ISendOrderRequest
  | ISendOrderSuccess
  | ISendOrderFailed
  | IResetOrder

const sendOrderRequest = (): ISendOrderRequest => {
  return {
    type: SEND_ORDER_REQUEST,
  }
}

const sendOrderSuccess = (orderNumber: number): ISendOrderSuccess => {
  return {
    type: SEND_ORDER_SUCCESS,
    payload: orderNumber
  }
}

const sendOrderFailed = (): ISendOrderFailed => {
  return {
    type: SEND_ORDER_FAILED
  }
}


export const createOrderId = (orderUrlEndpoint: string, options: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch(sendOrderRequest());
    request(orderUrlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        'ingredients': options,
      })
    }).then( res  => {
        if (res) {
          dispatch(sendOrderSuccess(res.order.number))
        } else {
          dispatch(sendOrderFailed())
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch(sendOrderFailed())
        // console.log(err);
      })
  }
}

