import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  RESET_ORDER,
  TOrderActions,
} from "../actions/order";

export type TOrderInitialState = {
  orderNumber: number;
  isSentOrderModalOpen: boolean;

  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
}

export const orderSentInitialState: TOrderInitialState = {
  orderNumber: 0,
  isSentOrderModalOpen: false,

  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
}

export const sendOrderReducer = (state = orderSentInitialState, action: TOrderActions ) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    };
    case SEND_ORDER_SUCCESS: {
      // console.log("SEND ORDER SUCCESS", action.payload)
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        orderNumber: action.payload,
        isSentOrderModalOpen: true,
      }
    };
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
      }
    };
    case RESET_ORDER: {
      return {
        ...orderSentInitialState,
      }
    };
    default: {
      return state;
    }
  }
};

