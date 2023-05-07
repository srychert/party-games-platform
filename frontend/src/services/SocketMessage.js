export const createMessage = (type, sender, content, json) => {
  if (!Object.values(TYPES).includes(type)) throw TypeError;
  const msg = {
    type,
    sender,
    content,
    json,
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
  NODE_OPTION: 'NODE_OPTION',
  CHOOSE_NODE: 'CHOOSE_NODE',

  // common
  STARTED: 'STARTED',
  ENDED: 'ENDED',
  RESULTS: 'RESULTS',
  ERROR: 'ERROR',
};
