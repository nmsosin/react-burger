import PropTypes from 'prop-types';
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

const checkPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

export default checkPropTypes;

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