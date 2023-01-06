import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import useSave from '../../hooks/useSave';

function SaveGame(props) {
  const { id, pin } = useParams();
  const location = useLocation();
  const [start, setStart] = useState(false);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState(location?.state?.players);

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => useSave(id, pin, round, players, id)} className="button">
        Save
      </button>
    </div>
  );
}

export default SaveGame;
