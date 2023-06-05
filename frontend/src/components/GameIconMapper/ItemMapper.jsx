import React from 'react';
import { ReactComponent as HealPotion } from '../../assets/potion.svg';

const switchItemsIcons = (game) => {
  switch (game) {
    default:
      return <HealPotion />;
  }
};

export default switchItemsIcons;
