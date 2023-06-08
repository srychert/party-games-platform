import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import { STANCES } from '../../../../enums/StanceTypes';
import { itemTypeToString } from '../../../../services/ItemTypeToString';
import getImgUrl from '../../../../services/FileService';

function Fight({ handleNodeOption }) {
  const { player } = useContext(playContext);
  const [stance, setStance] = useState(
    Object.values(STANCES).find((s) => s !== player.stance)
  );
  const [itemID, setItemID] = useState(null);

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
            {Object.values(STANCES).map((stance) => {
              return (
                <option value={stance} key={stance} hidden={player.stance === stance}>
                  {stance.charAt(0) + stance.toLowerCase().slice(1)}
                </option>
              );
            })}
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
        {Object.values(player.items).length > 0 ? (
          <div>
            {Object.keys(player.items)
              .map((key) => player.items[key])
              .map((item, index) => (
                <div
                  value={item.id}
                  key={index}
                  className={`flex-row justify-center ${
                    itemID === item.id ? 'bg-green-500/30' : ''
                  }`}
                >
                  <button onClick={() => handleClick(item.id)}>
                    <img
                      src={getImgUrl(`${item.path}`)}
                      alt={item.type}
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
