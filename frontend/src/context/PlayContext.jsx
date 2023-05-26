import { createContext } from 'react';

const playContext = createContext({
  player: null,
  nodeOptions: null,
  node: null,
  enemy: null,
  error: null,
});

export default playContext;
