import {useDispatch, useSelector} from "react-redux";
import {React, useMemo} from "react";
import {useDrag, useDrop} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT} from "../../services/actions/constructorIngredients";

const OptionalConstructorIngredients = ({ ingredient, ingredientIndex }) => {
  const { constructorIngredients } = useSelector((store) => ({
    constructorIngredients: store.constructorIngredients.constructorIngredients,
  }));
  const dispatch = useDispatch();
  const handleDelete = (ingredient) => {
    console.log('ingredient:', ingredient);
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredient
    })
  }

  // Sort optional ingredients feature
  console.log("constructorIngredients:", constructorIngredients);

  const [{ isDragging }, dragSortRef] = useDrag({
    type: "optionalIngredient",
    item: (ingredient, index) => {
      return {ingredient, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  console.log("isDragging:", isDragging);

  return (

    <div ref={dragSortRef} className={burgerConstructorStyles.constructorElementContainer} key={`${ingredient._id}_${constructorIngredients.indexOf(ingredient)}`}>
      <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary"/></span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDelete(ingredient)}
      />
    </div>

  )
}

export default OptionalConstructorIngredients;