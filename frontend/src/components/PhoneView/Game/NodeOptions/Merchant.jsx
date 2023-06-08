import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import { itemTypeToString } from '../../../../services/ItemTypeToString';

function Merchant({ handleNodeOption }) {
  const [selectedItemID, setselectedItemID] = useState(null);
  const { player, currentNode } = useContext(playContext);
  console.log(player);

  const handleClick = (id) => {
    if (selectedItemID === id) {
      setselectedItemID(null);
    } else {
      setselectedItemID(id);
    }
  };

  return (
    <>
      <div className="answerBox flex-col">
        <div>Select an item to buy</div>
        <div className="grid">
          {currentNode.itemsList
            .filter((item) => item.cost < player.gold)
            .map((item, index) => (
              <div
                value={item.id}
                style={{ backgroundColor: selectedItemID === item.id ? 'green' : '' }}
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
            onClick={() =>
              handleNodeOption({
                ...player.options.find((option) => option.name === 'buyItem'),
                parameters: [{ value: selectedItemID }],
              })
            }
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Merchant;
