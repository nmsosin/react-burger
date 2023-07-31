
import { ingredientsListReducer } from './ingredientsList';
import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredients';
import { currentIngredientReducer } from './currentIngredient';
import {sendOrderReducer} from './order';
import {getOrdersReducer} from './orderInfo'
import {userReducer} from "./user";
import {wsReducer} from "./websocket";

export const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  ingredientsList: ingredientsListReducer,
  currentIngredient: currentIngredientReducer,
  order: sendOrderReducer,
  orderInfo: getOrdersReducer,
  user: userReducer,
  wsOrdersFeed: wsReducer,
});