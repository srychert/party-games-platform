import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Heal({ handleNodeOption }) {
  const [healAmount, setHealAmount] = useState(2);
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
        Free Heal
      </button>
      <div className="answerBox">
        Buy Heal for {healAmount} gold
        <div className="grid">
          <button className="button" onClick={() => setHealAmount(healAmount + 1)}>
            +
          </button>
          <button className="button" onClick={() => setHealAmount(healAmount - 1)}>
            -
          </button>
          <button className="button" onClick={() => handleNodeOption(healAmount)}>
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Heal;
