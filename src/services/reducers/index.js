
import { ingredientsListReducer } from './ingredientsList';
import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './constructorIngredients';
import { currentIngredientReducer } from './currentIngredient';
import { orderReducer } from './order';
import {userReducer} from "./user";
import {wsReducer} from "./websocket";


export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userReducer,
  wsOrdersFeed: wsReducer,
});