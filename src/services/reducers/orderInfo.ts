import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/orderInfo";
import {RESET_CURRENT_ORDER, OPEN_CURRENT_ORDER} from "../actions/orderInfo";

export const orderInfoInitialState = {
  orders: [],
  currentOrder: null,
  isOrderModalOpen: false,

  getOrderRequest: false,
  getOrderSuccess: false,
  getOrderFailed: false,
}

export const getOrdersReducer = ( state = orderInfoInitialState, action ) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        getOrderRequest: true,
        getOrderSuccess: false,
        getOrderFailed: false,
      }
    };
    case GET_ORDER_SUCCESS: {
      console.log("get orders success", action.payload, state)
      return {
        ...state,
        getOrderRequest: false,
        getOrderSuccess: true,
        getOrderFailed: false,
        orders: action.payload,
      }
    };
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderRequest: false,
        getOrderSuccess: false,
        getOrderFailed: true,
      }
    };
    case OPEN_CURRENT_ORDER: {
      // console.log('action.payload', action.payload);
      return {
        ...state,
        currentOrder: action.payload,
        isOrderModalOpen: true,
      }
    };
    case RESET_CURRENT_ORDER: {
      return {
        ...orderInfoInitialState,
      }
    };

    default: {
      return state;
    }
  }
};
