import {useDispatch, useSelector} from "react-redux";
import {React, useMemo, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT, SORT_INGREDIENT, sortIngredients} from "../../services/actions/constructorIngredients";

const OptionalConstructorIngredients = ({ ingredient, ingredientIndex }) => {
  const { optionalIngredients } = useSelector((store) => ({
    optionalIngredients: store.constructorIngredients.optionalIngredients,
  }));
  const dispatch = useDispatch();

  const ref = useRef(null);

  const handleDelete = (ingredient) => {
    console.log('ingredient:', ingredient, ingredientIndex);
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredientIndex
    })
  }

  const [{ onSortHover}, dropSortRef] = useDrop({
    accept: "optionalIngredient",
    collect: (monitor) => ({
      onSortHover: monitor.isOver()
    }),
    hover: (optionalIngredient, monitor) => {
      if (!ref.current) return;

      const dragIndex = optionalIngredient.ingredientIndex;
      const hoverIndex = ingredientIndex;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }


      const dragIngredient = optionalIngredients[dragIndex];

      optionalIngredients.splice(dragIndex, 1);
      optionalIngredients.splice(hoverIndex, 0, dragIngredient);

      dispatch({type: SORT_INGREDIENT, payload: [...optionalIngredients] });

      optionalIngredient.index = hoverIndex;
    }
  })

  const [{ isDragging }, dragSortRef] = useDrag({
    type: "optionalIngredient",
    item: () => {
      return {
        ingredient,
        ingredientIndex
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  dragSortRef(dropSortRef(ref));

  return (

    <li ref={ref} className={burgerConstructorStyles.constructorElementContainer} >
      <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary"/></span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDelete(ingredient)}
      />
    </li>

  )
}

export default OptionalConstructorIngredients;