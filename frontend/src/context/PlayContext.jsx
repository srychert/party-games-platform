import { createContext } from 'react';

const playContext = createContext({
  player: null,
  nodeOptions: null,
  nodes: null,
  enemy: null,
  error: null,
});

export default playContext;
