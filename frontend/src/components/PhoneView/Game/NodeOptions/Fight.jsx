import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Fight({ handleNodeOption }) {
  const [stance, setStance] = useState(2);
  const [itemID, setItemID] = useState(null);
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
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
          <button
            className="button"
            onClick={() =>
              handleNodeOption({
                ...player.options[1],
                parameters: [{ value: stance }],
              })
            }
          >
            Confirm
          </button>
        </div>
        <div className="grid">
          {player.items.length > 0 ? (
            <div>
              <select onChange={(e) => setItemID(e.target.value)}>
                {player.items.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                className="button"
                onClick={() =>
                  handleNodeOption({
                    ...player.options[1],
                    parameters: [{ value: itemID }],
                  })
                }
              >
                Confirm
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Fight;

// TODO:

// null moze być "nie masz itemów"

// stance enum a nie jakiś string
