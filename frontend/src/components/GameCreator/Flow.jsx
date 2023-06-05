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
import NodeModal from './Modal/NodeModal.jsx';
import defaultNode from './defaultNode.js';
import { useAddGame } from '../../hooks/game/useAddGame.js';
import { IconContext } from 'react-icons';
import { CgPen } from 'react-icons/cg';
import GameInfoModal from './Modal/GameInfoModal.jsx';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import Loading from '../../views/Loading.jsx';

function Flow() {
  const [cookies] = useCookies();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [lastNodeId, setLastNodeId] = useState(initialNodes.length);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [node, setNode] = useState(nodes[0]);
  const { mutate, isLoading, isError, isSuccess, error } = useAddGame();
  const [gameInfo, setGameInfo] = useState({
    title: 'Title',
    description: '',
    createdBy: cookies.user,
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalInfo() {
    setIsOpenInfo(false);
  }

  function openModalInfo() {
    setIsOpenInfo(true);
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => {
        const connectedEdgesCount = eds.filter(
          (edge) => edge.target === connection.target
        ).length;

        return connectedEdgesCount < 4 ? addEdge(connection, eds) : eds;
      }),
    [setEdges]
  );

  const addNode = () => {
    setNodes((nds) => [...nds, { ...defaultNode, id: `${lastNodeId + 1}` }]);
    setLastNodeId(lastNodeId + 1);
  };

  const saveGame = () => {
    const game = { ...gameInfo };

    const gameNodes = nodes.reduce((acc, curr) => {
      const nextNodesID = edges
        .filter((edge) => edge.source === curr.id)
        .map((edge) => parseInt(edge.target));

      const id = parseInt(curr.id);

      acc[id] = { ...curr.data.node, id, nextNodesID };
      return acc;
    }, {});

    game.nodes = gameNodes;

    mutate({ game });
  };

  if (isSuccess) {
    return <Navigate to="/host" replace />;
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={(e) => {
          const clickedId = e.target.dataset.id;
          if (clickedId === '0') return;
          setNode(nodes.find((n) => n.id === clickedId));
          openModal();
        }}
        fitView
      >
        {isLoading && (
          <div
            className="absolute z-50 h-full w-full"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <Loading />
          </div>
        )}
        <div className="absolute flex h-16 w-full justify-center px-14">
          <h1
            className="overflow-hidden text-ellipsis text-5xl font-semibold tracking-wider text-emerald-500"
            style={{ whiteSpace: 'nowrap' }}
          >
            {gameInfo.title}
          </h1>
        </div>
        <Background />
        <CustomControls addNode={addNode} />
        <Panel position="top-right">
          <button className="buttonSmall bg-violet-600" onClick={openModalInfo}>
            <IconContext.Provider value={{ size: '2em' }}>
              <CgPen />
            </IconContext.Provider>
          </button>
        </Panel>
        <Panel position="bottom-right">
          <button className="button" onClick={saveGame}>
            Save Game
          </button>
        </Panel>
      </ReactFlow>
      <GameInfoModal
        isOpen={isOpenInfo}
        closeModal={closeModalInfo}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
      />
      <NodeModal
        isOpen={isOpen}
        closeModal={closeModal}
        node={node}
        setNodes={setNodes}
        key={`${node.id}-${node.type}`}
      />
      {isError && (
        <span className="absolute bottom-0 left-1/2 text-rose-600">{error.message}</span>
      )}
    </>
  );
}

export default Flow;
