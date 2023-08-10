import {TIngredient} from "../../utils/types";

export const OPEN_CURRENT_INGREDIENT: "OPEN_CURRENT_INGREDIENT" = "OPEN_CURRENT_INGREDIENT";
export const CLOSE_CURRENT_INGREDIENT: "CLOSE_CURRENT_INGREDIENT" = "CLOSE_CURRENT_INGREDIENT";

export interface IOpenCurrentIngredient {
  readonly type: typeof OPEN_CURRENT_INGREDIENT;
  payload: TIngredient
}

export interface ICloseCurrentIngredient {
  readonly type: typeof CLOSE_CURRENT_INGREDIENT;
}