import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import useSave from '../../hooks/useSave';

function SaveGame(props) {
  const { id, pin } = useParams();
  const location = useLocation();
  const [start, setStart] = useState(false);
  const [round, setRound] = useState(0);
  const [players, setPlayers] = useState(location?.state?.players);
  const save = useSave(id, pin, round, players, id);

  return (
    <div className="flex items-center justify-center">
      <button className="button">Save</button>
      {save ? <p>Game saved</p> : <p>Game not saved</p>}
    </div>
  );
}

export default SaveGame;
