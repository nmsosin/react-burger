import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENT } from "../actions/constructorIngredients";

const initialConstructorState = {
  constructorIngredients: [],
}

export const constructorIngredientsReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          {
            constructorIngredientId: action.constructorIngredientId, ...action.payload
          }
        ]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (ingredient) => ingredient.constructorIngredientId !== action.payload.constructorIngredientId
        )
      };
    case SORT_INGREDIENT:
      return {
        ...state,
        constructorIngredients: action.payload,
      };
    default: {
      return state;
    }
  }
}