import React, { useState } from 'react';

function Heal({ handleNodeOption }) {
  const [healAmount, setHealAmount] = useState(2);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption()}>
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
