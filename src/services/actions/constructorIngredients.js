export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const SORT_INGREDIENT = 'SORT_INGREDIENT';

export const sortIngredients = (dragIndex, hoverIndex, optionalIngredients) => {
  const dragIngredient = optionalIngredients[dragIndex];
  optionalIngredients.splice(dragIndex, 1);
  optionalIngredients.splice(hoverIndex, 0, dragIngredient);
  return {
    type: SORT_INGREDIENT,
    payload: [...optionalIngredients],
  };
}
