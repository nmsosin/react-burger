import { OPEN_CURRENT_INGREDIENT, CLOSE_CURRENT_INGREDIENT } from "../actions/currentIngredient";

const currentIngredientInitialState = {
  currentIngredient: null,
  isIngredientModalOpen: false
}

export const currentIngredientReducer = ( state = currentIngredientInitialState, action ) => {
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