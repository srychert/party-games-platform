import React from 'react';
import { useLocation } from 'react-router-dom';

function Action(props) {
  const location = useLocation();
  const { player, node } = JSON.parse(location.state.player);
  console.log(player, node);
  return <div>{node.type}</div>;
}

export default Action;
