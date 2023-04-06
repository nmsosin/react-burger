import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "./ingredientsList";
import request from "../../utils/api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

// export const createOrder = async (url, options) => {
//   try {
//     const res = await fetch(orderUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'ingredients': options,
//       })
//     });
//     const result = await checkResponse(res);
//     setOrder(result.order.number);
//   } catch (err) {
//     alert(`Ой! Не удалось оформить заказ: ${err}`);
//   }
// }

export const createOrderId = (orderUrlEndpoint, options) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    request(orderUrlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': options,
      })
    }).then( res  => {
        if (res) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.order.number
          })
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          })
        }
        // console.log(res)
      })
      .catch( err => {
        dispatch({
          type: GET_ORDER_FAILED
        })
        // console.log(err);
      })
  }
}