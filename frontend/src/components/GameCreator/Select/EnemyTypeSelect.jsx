import React from 'react';
import BaseSelect from './BaseSelect';

function EnemyTypeSelect({ node, setNode, enemies }) {
  const handleSelect = (option) => {
    setNode((node) => {
      return {
        ...node,
        data: {
          ...node.data,
          node: {
            ...node.data.node,
            enemy: option.value,
          },
        },
      };
    });
  };

  return (
    <BaseSelect
      label="Enemy"
      options={enemies.map((enemy) => {
        return { option: enemy.type, value: enemy };
      })}
      startOption={{
        option: node.data.node?.enemy?.type ?? '',
        value: node.data.node?.enemy?.type ?? '',
      }}
      handleSelect={handleSelect}
    />
  );
}

export default EnemyTypeSelect;
