import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import GameView from '../../components/PhoneView/Game/GameView';
import { useCookies } from 'react-cookie';
import { createMessage } from '../../services/SocketMessage';
import Loading from '../Loading';
import playContext from '../../context/PlayContext';
import { TYPES } from '../../enums/MessageTypes';
import { NODES } from '../../enums/NodeTypes';

function Game(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pin } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [player, setPlayer] = useState(location.state.player); // player info, node options, flags, etc.
  const [nodeOptions, setNodeOptions] = useState(location.state.node); // node info (enemy, merchants items, etc.)
  const [nextNodes, setNextNodes] = useState(null); // next nodes to choose from
  const [currentNode, setCurrentNode] = useState({
    nextNodesID: [1, 2, 3, 4],
    id: 0,
    type: NODES.SKIP,
  });

  const onMessageReceived = function (msg) {
    console.log(msg);
    console.log(JSON.parse(msg.json));
    switch (msg.type) {
      case TYPES.STARTED:
        setLoading(false);
        break;
      case TYPES.ANSWER:
        setLoading(false);
        setPlayer(JSON.parse(msg.json).player);
        if (JSON.parse(msg.json).node) {
          setCurrentNode(JSON.parse(msg.json).node);
        }
        break;
      case TYPES.NEXT_ROUND:
        setLoading(false);
        setPlayer({ ...player, canChooseNode: true });
        setNextNodes(JSON.parse(msg.json).playersOptions[player.id]);
        break;
      case TYPES.ENDED:
        navigate('/player/join');
        break;
      case TYPES.ERROR:
        console.log(msg);
        setError(msg.content);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setTopics([`/topic/game-room/${pin}`, `/user/topic/reply`]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  if (loading) {
    return <Loading message={'Waiting for host'} />;
  }

  // cały json z options i params
  function handleNodeOption(nodeOption) {
    //NODE_OPTIONS
    // NODE TYPE jakies default params albo dodane hmmm
    console.log(nodeOption, 'NODE_OPTION');
    client.current.sendMessage(
      `/app/game-room/${pin}`,
      createMessage(TYPES.NODE_OPTION, cookies.nick, '', JSON.stringify(nodeOption))
    );
  }
  // tylko id node
  function handleChooseNode(node) {
    //CHOOSE_NODE
    console.log(node, 'CHOOSE_NODE');
    client.current.sendMessage(
      `/app/game-room/${pin}`,
      createMessage(TYPES.CHOOSE_NODE, cookies.nick, node)
    );
  }
  return (
    <>
      <playContext.Provider
        value={{
          player: player,
          nodeOptions: nodeOptions,
          error: error,
          nextNodes: nextNodes,
          currentNode: currentNode,
        }}
      >
        <GameView handleNextNode={handleChooseNode} handleNodeOption={handleNodeOption} />
      </playContext.Provider>
    </>
  );
}

export default Game;
