import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../actions/websocket';

const wsInitialState = {
  wsConnected: false,
  orders: [],
  ordersData: {},
  ordersDoneTotal: 0,
  ordersDoneToday: 0,
  error: undefined,
};

const wsAuthInitialState = {
  wsConnected: false,
  authOrders: [],
  ordersData: {},
  error: undefined,
};

export const wsReducer = (state = wsInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      // console.log("WS CONNECTION SUCCESS")
      return {
        ...state,
        wsConnected: true,
        error: undefined
      };

    case WS_CONNECTION_FAILED:
      // console.log("!!!WS orders connection failed", action.payload)
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case WS_CONNECTION_CLOSED:
      // console.log("WS orders connection closed")
      return {
        ...state,
        wsConnected: false,
        error: undefined
      };

    case WS_GET_ORDERS:
      // console.log("WS orders connected", action.payload)
      return {
        ...state,
        orders: action.payload.orders,
        ordersData: {
          ...state.ordersData,
          ordersDoneTotal: action.payload.total,
          ordersDoneToday: action.payload.totalToday,
        }
      };

    default:
      return state;
  }
}

export const wsAuthReducer = (state = wsAuthInitialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      // console.log("WS CONNECTION SUCCESS")
      return {
        ...state,
        wsConnected: true,
        error: undefined
      };

    case WS_CONNECTION_FAILED:
      // console.log("!!!WS orders connection failed", action.payload)
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case WS_CONNECTION_CLOSED:
      // console.log("WS orders connection closed")
      return {
        ...state,
        wsConnected: false,
        error: undefined
      };

    case WS_GET_ORDERS:
      // console.log("WS orders connected", action.payload)
      return {
        ...state,
        authOrders: action.payload.orders,
      };

    default:
      return state;
  }
}