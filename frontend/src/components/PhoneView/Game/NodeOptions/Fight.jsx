import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Fight({ handleNodeOption }) {
  const [stance, setStance] = useState(2);
  const [itemID, setItemID] = useState(null);
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption()}>
        Fight
      </button>
      <div className="answerBox">
        Change fight stance
        <div className="grid">
          <select onChange={(e) => setStance(e.target.value)}>
            <option value="defensive">Defensive</option>
            <option value="offensive">Offensive</option>
            <option value="balanced">Balanced</option>
          </select>
          <button className="button" onClick={() => handleNodeOption(stance)}>
            Confirm
          </button>
        </div>
        <div className="grid">
          <select onChange={(e) => setItemID(e.target.value)}>
            {player.items.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
          <button className="button" onClick={() => handleNodeOption(itemID)}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Fight;
