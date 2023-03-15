import { ADD_INGREDIENT, REMOVE_INGREDIENT, SORT_INGREDIENT } from "../actions/constructorIngredients";

const initialConstructorState = {
  constructorIngredients: [
    {
      "_id":"60666c42cc7b410027a1a9be",
      "name":"Мини-салат Экзо-Плантаго",
      "type":"main",
      "proteins":1,
      "fat":2,
      "carbohydrates":3,
      "calories":6,
      "price":4400,
      "image":"https://code.s3.yandex.net/react/code/salad.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/salad-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/salad-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9b3",
      "name":"Филе Люминесцентного тетраодонтимформа",
      "type":"main",
      "proteins":44,
      "fat":26,
      "carbohydrates":85,
      "calories":643,
      "price":988,
      "image":"https://code.s3.yandex.net/react/code/meat-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
      "__v":0
    },
    {
      "_id":"60666c42cc7b410027a1a9bf",
      "name":"Сыр с астероидной плесенью",
      "type":"main",
      "proteins":84,
      "fat":48,
      "carbohydrates":420,
      "calories":3377,
      "price":4142,
      "image":"https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v":0
    },
  ]
}

export const constructorIngredientsReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          {
            //TODO: расписать детально пейлоад по наименованиям свойств каждого ингредиента
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