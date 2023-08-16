import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from "../../utils/types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useAppDispatch: () => AppDispatch | AppThunk = dispatchHook;
// export const useDispatch = () => dispatchHook<AppDispatch>();