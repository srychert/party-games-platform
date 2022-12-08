export const chatMessage = (sender, content, type) => {
  const msg = {
    sender,
    content,
    type,
    time: new Date().toLocaleString(),
  };
  return JSON.stringify(msg);
};

export const messageType = {
  CHAT: "CHAT",
  CONNECT: "CONNECT",
  DISCONNECT: "DISCONNECT",
  START_GAME: "START_GAME",
};
