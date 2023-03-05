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
  CREATED: 'CREATED',
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME',
  NEXT_ROUND: 'NEXT_ROUND',
  CREATE_ROOM: 'CREATE_ROOM',

  // player
  JOIN: 'JOIN',
  JOINED: 'JOINED',
  ANSWERS: 'ANSWERS',
  DUPLICATE_NICK: 'DUPLICATE_NICK',
  NO_PIN: 'NO_PIN',
  NO_ROOM: 'NO_ROOM',

  // common
  STARTED: 'STARTED',
  ENDED: 'ENDED',
  RESULTS: 'RESULTS',
};
