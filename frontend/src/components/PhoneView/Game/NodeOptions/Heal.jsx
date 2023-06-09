import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';

function Heal({ handleNodeOption }) {
  const [goldAmount, setGoldAmount] = useState(2);
  const { player } = useContext(playContext);
  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
        Free Heal
      </button>
      <div className="answerBox">
        Buy Heal for {goldAmount} gold
        <div className="grid">
          <button className="button" onClick={() => setGoldAmount(goldAmount + 1)}>
            +
          </button>
          <button className="button" onClick={() => setGoldAmount(goldAmount - 1)}>
            -
          </button>
          <button
            className="button"
            onClick={() =>
              handleNodeOption({
                ...player.options[1],
                parameters: [{ value: goldAmount }],
              })
            }
          >
            Confirm
          </button>
        </div>
      </div>
      <div className="answerBox">
        <button
          className="button"
          onClick={() =>
            handleNodeOption({
              ...player.options.find((option) => option.name === 'leave'),
            })
          }
        >
          Leave
        </button>
      </div>
    </>
  );
}

export default Heal;
