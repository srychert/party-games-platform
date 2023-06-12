import { useContext, useState } from 'react';
import hostContext from '../../context/HostContext';
import Stats from '../../components/PhoneView/Game/Stats';
import Helper from '../../components/Helper/Helper';
import BaseModal from '../GameCreator/Modal/BaseModal';
import { IconContext } from 'react-icons';
import switchIcon from '../NavigationBar/IconMapper';
import MainGamePodium from './MainGamePodium';

function MainGameView({ handleLeave, handleNextRound }) {
  const { players, gameEnded, currentNodes } = useContext(hostContext);
  const [showHelper, setShowHelper] = useState(false);
  const mapNodeTypeToString = (nodeType) => {
    switch (nodeType) {
      case 'FIGHT':
        return 'In fight';
      case 'MERCHANT':
        return 'Buys items';
      case 'HEAL':
        return 'Heals wounds';
      case 'SKIP':
        return 'Skips round';
      default:
        return nodeType;
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        {!gameEnded && (
          <>
            <div className="p-5">
              <button className="button" onClick={handleLeave}>
                Leave
              </button>
            </div>
            <div className="p-5">
              <button className="button" onClick={handleNextRound}>
                Next Round
              </button>
            </div>
          </>
        )}
        {gameEnded && (
          <div className="p-5">
            <button className="button" onClick={handleLeave}>
              End Game
            </button>
          </div>
        )}
        <button className="buttonSmall" onClick={() => setShowHelper(true)}>
          <IconContext.Provider value={{ size: '2em' }}>
            {switchIcon('/helper')}
          </IconContext.Provider>
        </button>
      </div>
      <div className="mx-5 flex flex-wrap items-center justify-center">
        {players && <MainGamePodium />}
      </div>
      <BaseModal isOpen={showHelper} handleClose={() => setShowHelper(false)}>
        <Helper />
      </BaseModal>
    </>
  );
}

export default MainGameView;
