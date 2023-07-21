import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_DATA,
} from '../actions/websocket';

const wsInitialState = {
  wsConnected: false,
  orders: [],
  ordersDoneTotal: 0,
  ordersDoneToday: 0,
  error: undefined
};

export const wsReducer = (state = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined
      };

    case WS_CONNECTION_FAILED:
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: undefined
      };

    case WS_GET_DATA:
      return {
        ...state,
        orders: [...state.orders, action.payload ]
      };

    default:
      return state;
  }
}