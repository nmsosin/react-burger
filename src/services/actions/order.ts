import request from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "./orderInfo";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";

export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";

interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}

interface ISendOrderSuccess {
  readonly type: typeof SEND_ORDER_SUCCESS;
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

export const createOrderId = (orderUrlEndpoint: string, options: string[]) => {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
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
      console.log('create order id res payload', res.order.number)
        if (res) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            payload: res.order.number
          })
        } else {
          dispatch({
            type: SEND_ORDER_FAILED
          })
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch({
          type: SEND_ORDER_FAILED
        })
        // console.log(err);
      })
  }
}

