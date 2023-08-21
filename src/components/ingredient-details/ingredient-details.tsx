import React, {FC, useMemo} from 'react';
import ingredientDetailsStyles from "../ingredient-details/ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {getIngredientsList} from "../../utils/constants";
import {TIngredient} from "../../utils/types";
import {useAppSelector} from "../../services/hooks/hooks";

type TIngredientDetails = {
  isSeparateTab: boolean;
}

const IngredientDetails: FC<TIngredientDetails> = ({isSeparateTab}) => {
  const { id } = useParams<{ id: string }>()
  const ingredients = useAppSelector(getIngredientsList);
  const currentIngredient = useMemo(() => ingredients?.find((ingredient: TIngredient ) => ingredient._id === id), [ingredients]);

  return  (
    <div className={isSeparateTab ? 'pt-30' : ''}>

      <h2 className={`text text_type_main-large ${ingredientDetailsStyles.ingredientModalTitle}`} style={isSeparateTab ? {textAlign: 'center'} : {} } >Детали ингредиента</h2>
      <div className={ingredientDetailsStyles.ingredientDetailsContainer}>
        <img src={currentIngredient?.image_large} alt={currentIngredient?.name} className={`${ingredientDetailsStyles.ingredientImage}`} />
        <h3 className={`text text_type_main-small pt-4 pb-8 ${ingredientDetailsStyles.ingredientTitle}`}>{currentIngredient?.name}</h3>
        <ul className={`${ingredientDetailsStyles.ingredientInfo}`}>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Калории, ккал
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient?.calories}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Белки, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient?.proteins}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Жиры, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient?.fat}</span>
          </li>
          <li className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.ingredientMacros}`}>
            Углеводы, г
            <span className={`text text_type_digits-default text_color_inactive pt-2 ${ingredientDetailsStyles.ingredientMacros}`}>{currentIngredient?.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetails;