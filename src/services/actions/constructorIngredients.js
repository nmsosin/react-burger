import {v4 as uuidv4} from "uuid";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export const RESET_INGREDIENT = 'RESET_INGREDIENT';

export const addConstructorIngredient = (ingredient, uniqueId) => {
  return {
    type: ADD_INGREDIENT,
    constructorIngredientId: uniqueId,
    payload: ingredient,
  }
}