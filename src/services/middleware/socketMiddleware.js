import {refreshUserToken} from "../actions/user";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsEnd, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;

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
            socket.close();
            return refreshUserToken().then(() => {
              dispatch({type: wsInit});
            })
              .catch((err) => {
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

        if (type === wsSendMessage) {
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