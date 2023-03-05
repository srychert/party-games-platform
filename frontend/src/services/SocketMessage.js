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
  // host
  START_GAME: 'START_GAME',
  NEXT_ROUND: 'NEXT_ROUND',
  // maybe not needed
  CREATE_ROOM: 'CREATE_ROOM',

  // player
  JOIN: 'JOIN',
  JOINED: 'JOINED',
  DUPLICATE_NICK: 'DUPLICATE_NICK',
  ANSWERS: 'ANSWERS',

  // common
  STARTED: 'STARTED',
  END_GAME: 'END_GAME',
};
