import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS} from "./ingredientsList";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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

export const createOrderId = (orderUrl, options) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'ingredients': options,
      })
    }).then(checkResponse)
      .then( res  => {
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