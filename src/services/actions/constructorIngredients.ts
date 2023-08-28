import {v4 as uuidv4} from "uuid";
import {TIngredient} from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

export const SORT_INGREDIENT: 'SORT_INGREDIENT' = 'SORT_INGREDIENT';

export const RESET_INGREDIENT: 'RESET_INGREDIENT' = 'RESET_INGREDIENT';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly constructorIngredientId: string;
  readonly payload: TIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient;
  payload: number;
}

export interface ISortIngredientAction {
  readonly type: typeof SORT_INGREDIENT;
  readonly optionalIngredients: TIngredient[];
  payload: TIngredient[]
}

export interface IResetIngredientAction {
  readonly type: typeof RESET_INGREDIENT;
}

export type TInitialConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | ISortIngredientAction
  | IResetIngredientAction

export const addConstructorIngredient = (ingredient: TIngredient, uniqueId: string): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    constructorIngredientId: uniqueId,
    payload: ingredient,
  }
}