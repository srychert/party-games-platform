import React, { useContext, useState } from 'react';
import playContext from '../../../context/PlayContext';
import { formatText } from '../../../services/formatText';
import getImgUrl from '../../../services/FileService';

function Equipment({ canUse, handleNodeOption, setIsOpen }) {
  const { player, nodes } = useContext(playContext);
  const [selectedItemID, setselectedItemID] = useState(null);
  console.log(player, nodes);

  // TODO remove duplicate code here and Merchant.jsx
  const handleClick = (id) => {
    if (selectedItemID === id) {
      setselectedItemID(null);
    } else {
      setselectedItemID(id);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {player.items &&
          Object.values(player.items).map((item, index) => (
            <div
              value={item.id}
              style={{ green: '' }}
              key={index}
              className={`flex rounded p-4 ${
                selectedItemID === item.id ? 'bg-green-500/30' : ''
              }`}
              onClick={() => handleClick(item.id)}
              tabIndex={0}
            >
              <img
                src={getImgUrl(`${item.path}`)}
                alt={item.name}
                className="h-12 w-12"
              />
              <div>
                {formatText(item.type)}
                <div>Cost: {item.cost}</div>
                <div>
                  {Object.entries(item.itemEffectMap).map(([effect, value], idx) => {
                    return (
                      <div key={idx}>
                        {formatText(effect)}: {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 grid place-content-center">
        {canUse ? (
          <button
            className="button"
            disabled={selectedItemID === null}
            onClick={() =>
              handleNodeOption({
                ...player.options.find((option) => option.name === 'useItem'),
                parameters: [{ value: selectedItemID }],
              })
            }
          >
            Use
          </button>
        ) : (
          <button className="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default Equipment;
