export default [
  {
    id: '1',
    type: 'input',
    data: { label: 'Starting Node' },
    position: { x: 0, y: 0 },
    sourcePosition: 'right',
    targetPosition: 'left',
    deletable: false,
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 200, y: -100 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '3',
    data: { label: 'Other' },
    position: { x: 400, y: 0 },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];
