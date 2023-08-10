import request from "../../utils/api";
import {AppDispatch, TIngredient} from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  data?: TIngredient[]
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsListActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed

export const getIngredientsData = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    request('ingredients')
      .then( res  => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          })
        }
        // console.log(res)
      })
      .catch( err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
      // console.log(err);
    })
  }
}
