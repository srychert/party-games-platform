import React, { useState, useContext, useMemo } from 'react';
import playContext from '../../../../context/PlayContext';
import { formatText } from '../../../../services/formatText';
import getImgUrl from '../../../../services/FileService';
import BaseModal from '../../../GameCreator/Modal/BaseModal';

function Merchant({ handleNodeOption, isOpen, setIsOpen }) {
  const [selectedItemID, setselectedItemID] = useState(null);
  const { player, currentNode } = useContext(playContext);

  const nodeItems = useMemo(() => {
    return currentNode.itemsList.sort((a, b) => (a.cost > b.cost ? -1 : 1));
  }, [currentNode.itemsList, player?.gold]);

  const handleClick = (id) => {
    if (selectedItemID === id) {
      setselectedItemID(null);
    } else {
      setselectedItemID(id);
    }
  };

  return (
    <>
      <div className="answerBox" onClick={() => setIsOpen(true)} tabIndex={0}>
        Buy Item
      </div>
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
      {[...Array(2).keys()].map((fakeButton) => {
        return <button className="answerBox" key={`merchant-${fakeButton}`}></button>;
      })}

      <BaseModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        title="Select an item to buy"
      >
        <div className="grid grid-cols-2 gap-2">
          {nodeItems.map((item, index) => (
            <div
              key={index}
              className={`flex cursor-pointer select-none items-center gap-2 rounded p-4
                ${selectedItemID === item.id ? 'bg-green-500/30' : ''}
                ${item.cost > player.gold ? 'bg-gray-400 grayscale' : ''}`}
              onClick={() => handleClick(item.cost > player.gold ? null : item.id)}
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
          <button
            className={`button w-32 `}
            disabled={selectedItemID === null}
            onClick={() => {
              handleNodeOption({
                ...player.options.find((option) => option.name === 'buyItem'),
                parameters: [{ value: selectedItemID }],
              });
              setIsOpen(false);
            }}
          >
            Buy
          </button>
        </div>
      </BaseModal>
    </>
  );
}

export default Merchant;
