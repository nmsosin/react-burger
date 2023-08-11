
import {ingredientsListInitialState, ingredientsListReducer, TIngredientsListInitialState,} from './ingredientsList';
import { combineReducers } from 'redux';
import {
  constructorIngredientsReducer,
  initialConstructorState,
  TInitialConstructorState,
} from './constructorIngredients';
import {
  currentIngredientReducer,
  TCurrentIngredientInitialState
} from './currentIngredient';
import {sendOrderReducer, TOrderInitialState} from './order';
import {getOrdersReducer, TOrderInfoInitialState} from './orderInfo'
import {TUserInitialState, userReducer} from "./user";
import {
  wsAuthReducer,
  wsReducer,
  TWsInitialState,
  TWsAuthInitialState
} from "./websocket";

export type TStore = {
  constructorIngredients: TInitialConstructorState;
  currentIngredient: TCurrentIngredientInitialState;
  ingredientsList: TIngredientsListInitialState;
  order: TOrderInitialState;
  orderInfo: TOrderInfoInitialState;
  user: TUserInitialState;
  wsOrdersFeed: TWsInitialState;
  wsAuthOrdersFeed: TWsAuthInitialState;
}

export const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  ingredientsList: ingredientsListReducer,
  currentIngredient: currentIngredientReducer,
  order: sendOrderReducer,
  orderInfo: getOrdersReducer,
  user: userReducer,
  wsOrdersFeed: wsReducer,
  wsAuthOrdersFeed: wsAuthReducer
});