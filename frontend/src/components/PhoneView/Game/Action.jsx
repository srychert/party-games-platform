import React, { useContext } from 'react';
import playContext from '../../../context/PlayContext';

function Action() {
  const { player, nodes } = useContext(playContext);

  return <div>{nodes.type}</div>;
}

export default Action;
