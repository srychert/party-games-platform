import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Merchant({ handleNodeOption }) {
  const [selectedItemID, setselectedItemID] = useState(null);
  const { player } = useContext(playContext);
  return (
    <>
      <div className="answerBox">
        Select an item to buy
        <div className="grid">
          <select onChange={(e) => setselectedItemID(e.target.value)}>
            {player.items.map((item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
          <button className="button" onClick={() => handleNodeOption(selectedItemID)}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Merchant;
