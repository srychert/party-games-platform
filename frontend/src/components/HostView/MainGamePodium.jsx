import { useContext, useState } from 'react';
import Stats from '../PhoneView/Game/Stats';
import hostContext from '../../context/HostContext';

function MainGamePodium() {
  const { players } = useContext(hostContext);
  const [playersArray, setPlayersArray] = useState(
    Object.keys(players)
      .map((key, index) => players[key])
      .sort((a, b) => b.gold - a.gold)
  );

  console.log(playersArray[0]);

  // if (playersArray.length < 3) return null;
  return (
    <>
      <div className="mx-5 flex flex-wrap items-center justify-center">
        <div id="podium" className="grid grid-cols-3 gap-4">
          {playersArray.map((player) => (
            <Stats key={player.id} entity={player} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MainGamePodium;
