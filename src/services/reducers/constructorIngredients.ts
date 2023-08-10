import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
  RESET_INGREDIENT,
  IAddIngredientAction, IRemoveIngredientAction, ISortIngredientAction, IResetIngredientAction
} from "../actions/constructorIngredients";
import {TIngredient} from "../../utils/types";

export type TInitialConstructorState = {
  bun: TIngredient | null;
  optionalIngredients: TIngredient[];
}

export type TInitialConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | ISortIngredientAction
  | IResetIngredientAction

export const initialConstructorState = {
  bun: null,
  optionalIngredients: []
}

export const constructorIngredientsReducer = (state:TInitialConstructorState = initialConstructorState, action: TInitialConstructorActions): TInitialConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      };

      return {
        ...state,
        optionalIngredients: [
          ...state.optionalIngredients,
          {
            constructorIngredientId: action.constructorIngredientId,
            ...action.payload,
          }
        ]
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        optionalIngredients: state.optionalIngredients.filter(
          (ingredient) => {
            return state.optionalIngredients.indexOf(ingredient) !== action.payload
          }
        )
      };

    case SORT_INGREDIENT:
      return {
        ...state,
        optionalIngredients: action.payload,
      };

    case RESET_INGREDIENT:
      return {
        ...initialConstructorState,
      };

    default: {
      return state;
    }
  }
}