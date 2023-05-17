import React from 'react';
import { ReactComponent as EnemyIcon } from '../../assets/enemy.svg';

const switchItemsIcons = (game) => {
  switch (game) {
    default:
      return <EnemyIcon />;
  }
};

export default switchItemsIcons;
