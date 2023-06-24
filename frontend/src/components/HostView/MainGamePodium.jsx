import { useContext, useEffect, useState } from 'react';
import Stats from '../PhoneView/Game/Stats';
import hostContext from '../../context/HostContext';

function MainGamePodium() {
  const { players } = useContext(hostContext);
  const [playersArray, setPlayersArray] = useState(
    Object.keys(players)
      .map((key, index) => players[key])
      .sort((a, b) => b.gold - a.gold)
  );

  useEffect(() => {
    setPlayersArray(
      Object.keys(players)
        .map((key, index) => players[key])
        .sort((a, b) => b.gold - a.gold)
    );
  }, [players]);

  // if (playersArray.length < 3) return null;
  return (
    <>
      <div className="mx-5 flex flex-wrap items-center justify-center">
        <div id="podium" className="grid grid-cols-3 gap-4">
          {playersArray.length > 0 && (
            <Stats entity={{ ...playersArray[0], path: 'knight1.png' }} />
          )}
          {playersArray.length > 1 && (
            <Stats entity={{ ...playersArray[1], path: 'knight2.png' }} />
          )}
          {playersArray.length > 2 && (
            <Stats entity={{ ...playersArray[2], path: 'knight3.png' }} />
          )}
          {playersArray.length > 3 &&
            playersArray
              .slice(0, 3)
              .map((player) => <Stats key={player.id} entity={player} />)}
        </div>
      </div>
    </>
  );
}

export default MainGamePodium;
