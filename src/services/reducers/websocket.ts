import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS, TWsActions,
} from '../actions/websocket';
import {TOrder} from "../../utils/types";

export type TWsInitialState = {
  wsConnected: boolean;
  orders: string[];
  ordersData: TOrder | {};
  ordersDoneTotal: number;
  ordersDoneToday: number;
  error?: string;
}
export const wsInitialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  ordersData: {},
  ordersDoneTotal: 0,
  ordersDoneToday: 0,
  error: undefined,
};

export type TWsAuthInitialState = {
  wsConnected: boolean;
  authOrders: string[];
  ordersData: TOrder | {};
  error?: string;
}
export const wsAuthInitialState: TWsAuthInitialState = {
  wsConnected: false,
  authOrders: [],
  ordersData: {},
  error: undefined,
};

export const wsReducer = (state = wsInitialState, action: TWsActions) => {
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

export const wsAuthReducer = (state = wsAuthInitialState, action: TWsActions) => {
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