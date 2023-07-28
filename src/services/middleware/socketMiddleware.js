export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsEnd, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;

      if (type === wsInit) {
        console.log("WS_INIT")
        socket = new WebSocket(payload);
        console.log('socket', socket)
      }

      if (socket) {
        console.log('socket', socket)
        socket.onopen = event => {
          console.log('middleware onopen payload event', action)
          dispatch({ type: onOpen, payload: event });
        };

        socket.onmessage = event => {
          console.log('event', event)
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          console.log('middleware restParsedData onmessage', restParsedData);

          dispatch({ type: onMessage, payload: restParsedData });
        };


        socket.onerror = event => {
          console.log('onerror', event)
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
          console.log('onclose', event)
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