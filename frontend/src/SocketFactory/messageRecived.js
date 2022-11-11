const messageRecived = (payload) => {
  payload = JSON.parse(payload);
  switch (payload.type) {
    case "CONNECT":
      return {
        sender: payload.sender,
        content: payload.content,
        type: payload.type,
        time: payload.time,
      };
    case "DISCONNECT":
      return {
        sender: payload.sender,
        content: payload.content,
        type: payload.type,
        time: payload.time,
      };
    case "ANSWER":
      return {
        sender: payload.sender,
        content: payload.content,
        type: payload.type,
        time: payload.time,
      };
    default:
      return {
        sender: payload.sender,
        content: payload.content,
        type: payload.type,
        time: payload.time,
      };
  }
};

export default messageRecived;
