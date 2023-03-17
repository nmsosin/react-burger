import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENT } from "../actions/constructorIngredients";

const initialConstructorState = {
  constructorIngredients: []
}

export const constructorIngredientsReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      // console.log(state.constructorIngredients);
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          {
            //TODO: расписать детально пейлоад по наименованиям свойств каждого ингредиента
            constructorIngredientId: action.payload._id, ...action.payload
          }
        ]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (ingredient) => ingredient._id !== action.payload._id
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