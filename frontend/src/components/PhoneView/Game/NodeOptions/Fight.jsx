import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import { STANCES } from '../../../../enums/StanceTypes';

function Fight({ handleNodeOption }) {
  const [stance, setStance] = useState(2);
  const [itemID, setItemID] = useState(null);
  const { player } = useContext(playContext);
  return (
    <>
      <button
        className="answerBox"
        onClick={() =>
          handleNodeOption(player.options.find((option) => option.name === 'fight'))
        }
      >
        Fight
      </button>
      <div className="answerBox">
        Change fight stance
        <div className="grid">
          <select onChange={(e) => setStance(e.target.value)}>
            <option
              value={STANCES.DEFENSIVE}
              visibility={(player.stance !== STANCES.DEFENSIVE).toString()}
            >
              Defensive
            </option>
            <option
              value={STANCES.OFFENSIVE}
              visibility={(player.stance !== STANCES.OFFENSIVE).toString()}
            >
              Offensive
            </option>
            <option
              value={STANCES.COUNTER}
              visibility={(player.stance !== STANCES.COUNTER).toString()}
            >
              Counter
            </option>
            <option
              value={STANCES.NORMAL}
              visibility={(player.stance !== STANCES.NORMAL).toString()}
            >
              Normal
            </option>
          </select>
          <button
            className="button"
            onClick={() =>
              handleNodeOption({
                ...player.options.find((option) => option.name === 'changeStance'),
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
                    ...player.options.find((option) => option.name === 'useItem'),
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
