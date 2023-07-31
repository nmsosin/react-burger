import request from "../../utils/api";
import {getCookie} from "../../utils/cookie";

export const SEND_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "GET_ORDER_FAILED";

export const RESET_ORDER = "RESET_ORDER";

export const createOrderId = (orderUrlEndpoint, options) => {
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

