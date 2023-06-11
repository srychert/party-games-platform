import React, { useState, useContext } from 'react';
import playContext from '../../../../context/PlayContext';
import { STANCES } from '../../../../enums/StanceTypes';
import { formatText } from '../../../../services/formatText';
import BaseModal from '../../../GameCreator/Modal/BaseModal';

function Fight({ handleNodeOption, isOpen, setIsOpen, isOpenStance, setIsOpenStance }) {
  const { player } = useContext(playContext);
  const [stance, setStance] = useState(
    Object.values(STANCES).find((s) => s !== player.stance)
  );

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
      <button className="answerBox" onClick={() => setIsOpenStance(true)}>
        Change stance
      </button>
      <button className="answerBox" onClick={() => setIsOpen(true)}>
        Use Item
      </button>
      <BaseModal
        isOpen={isOpenStance}
        handleClose={() => setIsOpenStance(false)}
        title="Select stance"
      >
        <div className="grid">
          {Object.values(STANCES).map((s) => {
            return (
              <div
                value={s}
                key={s}
                onClick={() => setStance(s)}
                className={`flex rounded p-4 ${s === stance ? 'bg-green-500/30' : ''}`}
              >
                {formatText(s)}
              </div>
            );
          })}
          <button
            className="button mt-4"
            onClick={() => {
              handleNodeOption({
                ...player.options.find((option) => option.name === 'changeStance'),
                parameters: [{ value: stance }],
              });
              setIsOpenStance(false);
            }}
          >
            Change
          </button>
        </div>
      </BaseModal>
    </>
  );
}

export default Fight;
