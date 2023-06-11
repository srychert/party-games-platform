import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import BaseModal from '../../../GameCreator/Modal/BaseModal';

function Heal({ handleNodeOption, isOpen, setIsOpen }) {
  const [goldAmount, setGoldAmount] = useState(2);
  const { player, currentNode } = useContext(playContext);

  const handleGoldChange = (e) => {
    if (e.target.id === '-') {
      if (goldAmount > 1) setGoldAmount((prev) => prev - 1);
    }

    if (e.target.id === '+') {
      if (player.hp + currentNode.baseHeal + goldAmount < 20)
        setGoldAmount((prev) => prev + 1);
    }
  };

  return (
    <>
      <button className="answerBox" onClick={() => handleNodeOption(player.options[0])}>
        Free Heal
      </button>
      <button className="answerBox" onClick={() => setIsOpen(true)}>
        Buy Heal
      </button>
      <BaseModal isOpen={isOpen} handleClose={() => setIsOpen(false)} title="Buy heal">
        <div className="flex justify-between">
          <div>
            <div>Base heal for this node is {currentNode.baseHeal}</div>
            <div>
              You can get between {currentNode.baseHeal + goldAmount} and{' '}
              {currentNode.baseHeal + goldAmount + 2} hp
            </div>
          </div>
          <div className="grid w-36 grid-cols-3">
            <button id="-" className="button" onClick={handleGoldChange}>
              -
            </button>
            <span className="grid place-content-center">{goldAmount}</span>
            <button id="+" className="button" onClick={handleGoldChange}>
              +
            </button>
          </div>
          <button
            className="button w-32"
            onClick={() =>
              handleNodeOption({
                ...player.options[1],
                parameters: [{ value: goldAmount }],
              })
            }
          >
            Buy
          </button>
        </div>
      </BaseModal>
      <button
        className="answerBox"
        onClick={() =>
          handleNodeOption({
            ...player.options.find((option) => option.name === 'leave'),
          })
        }
      >
        Leave
      </button>
    </>
  );
}

export default Heal;
