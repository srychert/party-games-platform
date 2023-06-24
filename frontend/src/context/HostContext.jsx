import { createContext } from 'react';

const hostContext = createContext({
  players: null,
  gameEnded: false,
  currentNodes: null,
});

export default hostContext;
