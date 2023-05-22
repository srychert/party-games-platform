import React from 'react';
import BaseSelect from './BaseSelect';
import { NODES } from '../NodeTypes';

function NodeTypeSelect({ node, setNode, options }) {
  const handelSelect = (option) => {
    setNode((node) => {
      return {
        ...node,
        data: {
          label: option.value,
          node: {
            type: option.value,
          },
        },
      };
    });
  };

  const defaultOptions = Object.values(NODES).map((n) => {
    return {
      option: n,
      value: n,
    };
  });

  return (
    <BaseSelect
      options={options || defaultOptions}
      startOption={{ option: node.data.node.type, value: node.data.node.type }}
      handelSelect={handelSelect}
    />
  );
}

export default NodeTypeSelect;
