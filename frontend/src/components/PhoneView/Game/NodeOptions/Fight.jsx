import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import { STANCES } from '../../../../enums/StanceTypes';
import { itemTypeToString } from '../../../../services/ItemTypeToString';

function Fight({ handleNodeOption }) {
  const [stance, setStance] = useState(2);
  const [itemID, setItemID] = useState(null);
  const { player } = useContext(playContext);

  const handleClick = (id) => {
    if (itemID === id) {
      setItemID(null);
    } else {
      setItemID(id);
    }
  };

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
      </div>
      <div className="answerBox grid">
        {player.items ? (
          <div>
            {Object.keys(player.items)
              .map((key) => player.items[key])
              .map((item, index) => (
                <div
                  value={item.id}
                  style={{ backgroundColor: itemID === item.id ? 'green' : '' }}
                  key={index}
                  className="flex-row justify-center"
                >
                  <button onClick={() => handleClick(item.id)}>
                    <img
                      src={`/src/assets/${item.path}`}
                      alt={item.name}
                      className="m-auto h-12 w-12"
                    />
                    <div>
                      {itemTypeToString(item.type)} {item.cost}
                    </div>
                  </button>
                </div>
              ))}

            <button
              className="button"
              disabled={itemID === null}
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
        ) : (
          <div>You have no items</div>
        )}
      </div>
    </>
  );
}

export default Fight;
