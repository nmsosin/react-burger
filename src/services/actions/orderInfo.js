import request from "../../utils/api";
import {getCookie} from "../../utils/cookie";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const RESET_CURRENT_ORDER = "RESET_CURRENT_ORDER";
export const OPEN_CURRENT_ORDER = "OPEN_CURRENT_ORDER";

export const getOrders = () => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    request('orders/all',
      {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      },
    }).then( res  => {
      if (res) {
        console.log('get orders res', res)
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.orders,
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
      console.log('res', res)
    })
      .catch( err => {
        dispatch({
          type: GET_ORDER_FAILED
        })
        console.log(err);
      })
  }
}