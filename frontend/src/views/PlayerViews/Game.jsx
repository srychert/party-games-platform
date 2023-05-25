import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import GameView from '../../components/PhoneView/Game/GameView';
import { useCookies } from 'react-cookie';
import { TYPES, createMessage } from '../../services/SocketMessage';
import Loading from '../Loading';
import Error from '../Error';
import playContext from '../../context/PlayContext';

function Game(props) {
  const { client, setTopics, setHandleMessage } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pin } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const [player, setPlayer] = useState(location.state.player);
  const [nodes, setNodes] = useState(location.state.nodes);

  const onMessageReceived = function (msg) {
    console.log(msg);
    console.log(JSON.parse(msg.json));
    switch (msg.type) {
      case TYPES.STARTED:
        setLoading(false);
        console.log(player);
        break;
      case TYPES.ANSWERS:
        setLoading(false);
        setPlayer(JSON.parse(msg.json).player);
        break;
      case TYPES.NEXT_ROUND:
        setLoading(false);
        setPlayer((player.canChooseNode = true));
        setNodes(JSON.parse(msg.json).playersOptions[player.id]);
        break;
      case TYPES.ENDED:
        navigate('/player/join');
        break;
      case TYPES.ERROR:
        console.log(msg);
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

  if (error) {
    return <Error message={error} />;
  }
  // cały json z options i params
  function handleNodeOption(nodeOption) {
    //NODE_OPTIONS
    createMessage(TYPES.NODE_OPTIONS, cookies.nick, '', nodeOption);
  }
  // tylko id node
  function handleChooseNode(node) {
    //CHOOSE_NODE
    createMessage(TYPES.CHOOSE_NODE, cookies.nick, node);
  }

  return (
    <>
      <playContext.Provider value={{ player, nodes }}>
        <GameView handleNextNode={handleChooseNode} handleNodeOption={handleNodeOption} />
      </playContext.Provider>
    </>
  );
}

export default Game;
