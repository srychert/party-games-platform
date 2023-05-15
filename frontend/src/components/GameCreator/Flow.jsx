import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import initialNodes from './nodes.jsx';
import initialEdges from './edges.js';
import CustomControls from './CustomControls.jsx';
import '../../css/react-flow.css';
import NodeModal from './NodeModal.jsx';

function Flow({ items, enemies }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [lastNodeId, setLastNodeId] = useState(initialNodes.length);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    console.log(items);
    console.log(enemies);
  }, [items, enemies]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `${lastNodeId + 1}`,
        data: { label: '' },
        position: { x: -100, y: -100 },
        sourcePosition: 'right',
        targetPosition: 'left',
      },
    ]);
    setLastNodeId(lastNodeId + 1);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={() => {
          console.log('dbClick');
          openModal();
        }}
        onNodeContextMenu={(e) => {
          e.preventDefault();
          console.log('menu');
        }}
        fitView
      >
        <Background />
        <CustomControls addNode={addNode} />
        <Panel position="bottom-right">
          <button className="button">Save Game</button>
        </Panel>
      </ReactFlow>
      <NodeModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
    </>
  );
}

export default Flow;
