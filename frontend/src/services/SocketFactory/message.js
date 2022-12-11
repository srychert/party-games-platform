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
  ANSWERS: 'ANSWERS',
  RESULT: 'RESULT',
  MESSAGE: 'MESSAGE',
  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  START_GAME: 'START_GAME',
};
