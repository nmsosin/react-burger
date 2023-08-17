import {FC, useEffect} from 'react';
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { getIngredientsData } from "../services/actions/ingredientsList";
import {useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import generalStyles from "../components/app/app.module.css";
import {useAppDispatch} from "../services/hooks/hooks";
import {BASE_URL, getIngredientsList} from "../utils/constants";

export const MainPage: FC = () => {
  const ingredientsList = useSelector(getIngredientsList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredientsData(`${BASE_URL}/ingredients`))
  }, [dispatch]);

  return (
    <>
      <main className={generalStyles.content}>
        { (ingredientsList.length !== 0) && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients  />
              <BurgerConstructor />
            </DndProvider>
          )
        }
      </main>
    </>
  );
}
