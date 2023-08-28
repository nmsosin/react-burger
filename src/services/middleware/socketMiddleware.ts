import {refreshUserToken} from "../actions/user";
import {TWebSocketActions} from "../actions/websocket";
import {Middleware} from "redux";

export const socketMiddleware = (wsActions: TWebSocketActions): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsEnd, onOpen, onClose, onError, onMessage, sendMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          // console.log('middleware restParsedData onmessage', restParsedData);
          if (data.message === "Invalid or missing token") {
            socket?.close();
            return refreshUserToken()?.then(() => {
              dispatch({type: wsInit});
            })
              .catch((err: Error) => {
                console.log("WS connection error:", err)
              })
          }

          dispatch({ type: onMessage, payload: restParsedData });
        };


        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === sendMessage) {
          socket.send(JSON.stringify({...payload}))
        }

        if (type === wsEnd) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};