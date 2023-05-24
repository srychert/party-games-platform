import defaultNode from './defaultNode';
import { NODES } from './NodeTypes';

export default [
  {
    ...defaultNode,
    id: '0',
    type: 'input',
    position: { x: 0, y: 0 },
    deletable: false,
  },

  {
    ...defaultNode,
    id: '1',
    position: { x: 200, y: -150 },
  },

  {
    ...defaultNode,
    id: '2',
    data: {
      label: NODES.FIGHT,
      node: {
        type: NODES.FIGHT,
      },
    },
    position: { x: 200, y: -50 },
  },

  {
    ...defaultNode,
    id: '3',
    data: {
    label: NODES.HEAL,
    node: {
      type: NODES.HEAL,
      },
    },
    position: { x: 200, y: 50 },
  },

  {
    ...defaultNode,
    id: '4',
    data: {
    label: NODES.MERCHANT,
    node: {
      type: NODES.MERCHANT,
      },
    },
    position: { x: 200, y: 150 },
  },
];
