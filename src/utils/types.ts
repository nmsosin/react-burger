import {Action, ActionCreator, Dispatch} from "redux";
import {TInitialConstructorActions} from "../services/actions/constructorIngredients";
import {TCurrentIngredientActions} from "../services/actions/currentIngredient";
import {TUserActions} from "../services/actions/user";
import {store} from "../index";
import {ThunkAction} from "redux-thunk";
import {TIngredientsListActions} from "../services/actions/ingredientsList";
import {TOrderInfoActions} from "../services/actions/orderInfo";
import {TOrderActions} from "../services/actions/order";
import {TWsActions} from "../services/actions/websocket";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorIngredientId?: string;
}

export type TOrdersData = {
  ordersDoneTotal?: number;
  ordersDoneToday?: number;
}

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  _id: string;
  status?: string;
  updatedAt?: string;
}

export type RootState = ReturnType<typeof store.getState>

type TApplicationActions =
  | TInitialConstructorActions
  | TCurrentIngredientActions
  | TIngredientsListActions
  | TOrderActions
  | TOrderInfoActions
  | TUserActions
  | TWsActions

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>