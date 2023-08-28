import {
  OPEN_CURRENT_INGREDIENT,
  CLOSE_CURRENT_INGREDIENT,
  IOpenCurrentIngredient,
  ICloseCurrentIngredient, TCurrentIngredientActions
} from "../actions/currentIngredient";
import {TIngredient} from "../../utils/types";

export type TCurrentIngredientInitialState = {
  currentIngredient: TIngredient | null;
  isIngredientModalOpen: boolean;
}

export const currentIngredientInitialState: TCurrentIngredientInitialState = {
  currentIngredient: null,
  isIngredientModalOpen: false
}

export const currentIngredientReducer = ( state = currentIngredientInitialState, action: TCurrentIngredientActions ): TCurrentIngredientInitialState => {
  switch (action.type) {
    case OPEN_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
        isIngredientModalOpen: true,
      }
    };
    case CLOSE_CURRENT_INGREDIENT: {
      return {
        ...currentIngredientInitialState,
      }
    };
    default: {
      return state;
    }
  }
};