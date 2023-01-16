import React from 'react';
import ingredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";

const IngredientDetails = (props) => {
  return(
    <div>

      <h2 className={`text text_type_main-large ${ingredientDetailsStyles.ingredientModalTitle}`}>Детали ингредиента</h2>
      <div className={ingredientDetailsStyles.ingredientDetailsContainer}>
        <img src="https://code.s3.yandex.net/react/code/meat-01.png" alt={"Ингредиент космического бургера"} className={`${ingredientDetailsStyles.ingredientImage}`} />
        <h3 className={`text text_type_main-small pt-4 pb-8 ${ingredientDetailsStyles.ingredientTitle}`}>Биокотлета из марсианской Магнолии</h3>
        <ul className={`${ingredientDetailsStyles.ingredientInfo}`}>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Калории, ккал
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>244,4</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Белки, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>12,2</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Жиры, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>17,2</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Углеводы, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>10,2</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;