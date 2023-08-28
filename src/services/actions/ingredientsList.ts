import request from "../../utils/api";
import {AppDispatch, AppThunk, TIngredient} from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  payload?: TIngredient[]
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsListActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed

const getIngredientsRequest = (): IGetIngredientsRequest => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  }
}

const getIngredientsSuccess = (ingredients: TIngredient[]): IGetIngredientsSuccess => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: ingredients
  }
}

const getIngredientsFailed = (): IGetIngredientsFailed => {
  return {
    type: GET_INGREDIENTS_FAILED,
  }
}

export const getIngredientsData: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    request('ingredients')
      .then( (res)  => {
        if (res) {
          dispatch(getIngredientsSuccess(res.data))
        } else {
          dispatch(getIngredientsFailed())
        }
        // console.log(res)
      })
      .catch( err => {
      dispatch(getIngredientsFailed())
      // console.log(err);
    })
  }
}
