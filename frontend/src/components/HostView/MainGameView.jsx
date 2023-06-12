import { useContext } from 'react';
import hostContext from '../../context/HostContext';
import Stats from '../../components/PhoneView/Game/Stats';
import Helper from '../../components/Helper/Helper';

function MainGameView({ handleLeave, handleNextRound }) {
  const { players, gameEnded, currentNodes } = useContext(hostContext);

  const mapNodeTypeToString = (nodeType) => {
    switch (nodeType) {
      case 'FIGHT':
        return 'In fight';
      case 'MERCHANT':
        return 'Buys items';
      case 'HEAL':
        return 'Heals wounds';
      case 'SKIP':
        return 'Skips round';
      default:
        return nodeType;
    }
  };
  return (
    <>
      <div className="flex justify-between">
        {!gameEnded && (
          <>
            <div className="p-5">
              <button className="button" onClick={handleLeave}>
                Leave
              </button>
            </div>
            <div className="p-5">
              <button className="button" onClick={handleNextRound}>
                Next Round
              </button>
            </div>
          </>
        )}
        {gameEnded && (
          <div className="p-5">
            <button className="button" onClick={handleLeave}>
              End Game
            </button>
          </div>
        )}
      </div>
      <div className="mx-5 flex flex-wrap items-center justify-center">
        {players &&
          Object.keys(players).map((key, index) => (
            <div className="flex flex-col justify-center" key={index}>
              <div className="text-center">{mapNodeTypeToString(currentNodes[key])}</div>
              <Stats entity={players[key]} />
            </div>
          ))}
      </div>
      <Helper />
    </>
  );
}

export default MainGameView;
