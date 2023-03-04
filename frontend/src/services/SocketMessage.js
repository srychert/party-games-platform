export const createMessage = (type, sender, content) => {
  if (!Object.values(TYPES).includes(type)) throw TypeError;
  const msg = {
    type,
    sender,
    content,
  };
  return JSON.stringify(msg);
};

export const TYPES = {
  JOIN: 'JOIN',
  JOINED: 'JOINED',
  DUPLICATE_NICK: 'DUPLICATE_NICK',
  CREATE_ROOM: 'CREATE_ROOM',
  START_GAME: 'START_GAME',
  ANSWERS: 'ANSWERS',
  RESULTS: 'RESULTS',
};
