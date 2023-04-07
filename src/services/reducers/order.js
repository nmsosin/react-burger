import { GET_ORDER_REQUEST, GET_ORDER_FAILED, GET_ORDER_SUCCESS, RESET_ORDER} from "../actions/order";

const orderInitialState = {
  orderNumber: 0,
  isOrderModalOpen: false,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = ( state = orderInitialState, action ) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    };
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderNumber: action.payload,
        isOrderModalOpen: true,
      }
    };
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
      }
    };
    case RESET_ORDER: {
      return {
        ...orderInitialState,
      }
    };
    default: {
      return state;
    }
  }
};