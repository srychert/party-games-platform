import { TYPES } from '../enums/MessageTypes';

export const createMessage = (type, sender, content, json) => {
  if (!Object.values(TYPES).includes(type)) throw TypeError;
  const msg = {
    type,
    sender,
    content,
    json,
  };
  console.log('createMessage', msg);
  return JSON.stringify(msg);
};
