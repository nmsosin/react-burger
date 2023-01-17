import React from 'react';
import ingredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";

const IngredientDetails = ({ items, iid }) => {

  const currentIngredient = items.find(i => i._id === iid);

  return(
    <div>

      <h2 className={`text text_type_main-large ${ingredientDetailsStyles.ingredientModalTitle}`}>Детали ингредиента</h2>
      <div className={ingredientDetailsStyles.ingredientDetailsContainer}>
        <img src={currentIngredient.image_large} alt={currentIngredient.name} className={`${ingredientDetailsStyles.ingredientImage}`} />
        <h3 className={`text text_type_main-small pt-4 pb-8 ${ingredientDetailsStyles.ingredientTitle}`}>{currentIngredient.name}</h3>
        <ul className={`${ingredientDetailsStyles.ingredientInfo}`}>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Калории, ккал
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient.calories}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Белки, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient.proteins}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Жиры, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient.fat}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Углеводы, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;