import defaultNode from './defaultNode';

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
    position: { x: 200, y: -50 },
  },

  {
    ...defaultNode,
    id: '3',
    position: { x: 200, y: 50 },
  },

  {
    ...defaultNode,
    id: '4',
    position: { x: 200, y: 150 },
  },
];
