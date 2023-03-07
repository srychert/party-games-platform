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
  CREATE_ROOM: 'CREATE_ROOM',
  NO_PIN: 'NO_PIN',
  CREATED: 'CREATED',
  START_GAME: 'START_GAME',
  END_GAME: 'END_GAME',
  NEXT_ROUND: 'NEXT_ROUND',

  // player
  JOIN: 'JOIN',
  JOINED: 'JOINED',
  DUPLICATE_NICK: 'DUPLICATE_NICK',
  NO_ROOM: 'NO_ROOM',
  PLAY: 'PLAY',
  ANSWERS: 'ANSWERS',

  // common
  STARTED: 'STARTED',
  ENDED: 'ENDED',
  RESULTS: 'RESULTS',
};
