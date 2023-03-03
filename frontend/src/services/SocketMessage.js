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
  CREATE_ROOM: 'CREATE_ROOM',
};
