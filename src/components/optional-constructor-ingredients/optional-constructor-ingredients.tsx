import {FC, useRef} from "react";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {REMOVE_INGREDIENT, SORT_INGREDIENT} from "../../services/actions/constructorIngredients";
import {getConstructorIngredients} from "../../utils/constants";
import {TIngredient} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";

type TOptionalConstructorIngredients = {
  ingredient: TIngredient;
  ingredientIndex: number;
}

type TDropCard = {
  ingredientIndex: number;
  index: number;
  id: string;
}

const OptionalConstructorIngredients: FC<TOptionalConstructorIngredients> = ({ ingredient, ingredientIndex }) => {
  const { optionalIngredients } = useAppSelector(getConstructorIngredients);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const handleDelete = (ingredient: TIngredient) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: ingredientIndex
    })
  }

  const [, dropSortRef] = useDrop<TDropCard>({
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
      const clientOffset = monitor?.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;


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
    <li ref={ref} className={burgerConstructorStyles.constructorElementContainer} key={ingredient._id} >
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