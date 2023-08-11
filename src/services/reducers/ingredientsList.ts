import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsListActions
} from "../actions/ingredientsList";
import {TIngredient} from "../../utils/types";

export type TIngredientsListInitialState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TIngredient[];
}

export const ingredientsListInitialState: TIngredientsListInitialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: [],
}

export const ingredientsListReducer = (state = ingredientsListInitialState, action: TIngredientsListActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
}