
import {ingredientsListInitialState, ingredientsListReducer,} from './ingredientsList';
import { combineReducers } from 'redux';
import {constructorIngredientsReducer, initialConstructorState,} from './constructorIngredients';
import { currentIngredientReducer, currentIngredientInitialState } from './currentIngredient';
import {orderSentInitialState, sendOrderReducer} from './order';
import {getOrdersReducer, orderInfoInitialState} from './orderInfo'
import {userInitialState, userReducer} from "./user";
import {wsAuthReducer, wsReducer, wsInitialState, wsAuthInitialState} from "./websocket";

export type TStore = {
  constructorIngredients: initialConstructorState;
  currentIngredient: currentIngredientInitialState;
  ingredientsList: ingredientsListInitialState;
  order: orderSentInitialState;
  orderInfo: orderInfoInitialState;
  user: userInitialState;
  wsOrdersFeed: wsInitialState;
  wsAuthOrdersFeed: wsAuthInitialState;
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