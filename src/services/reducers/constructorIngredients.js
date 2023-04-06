import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENT, RESET_INGREDIENT } from "../actions/constructorIngredients";

const initialConstructorState = {
  bun: null,
  optionalIngredients: []
}

export const constructorIngredientsReducer = (state = initialConstructorState, action) => {
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