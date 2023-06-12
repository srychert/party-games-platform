import React, { useContext, useMemo, useState } from 'react';
import Loading from '../../../views/Loading';
import playContext from '../../../context/PlayContext';
import Skip from './NodeOptions/Skip';
import Fight from './NodeOptions/Fight';
import Heal from './NodeOptions/Heal';
import Merchant from './NodeOptions/Merchant';
import { NODES } from '../../../enums/NodeTypes';
import BaseModal from '../../GameCreator/Modal/BaseModal';
import Equipment from './Equipment';
import Stats from './Stats';

function GameView({ handleNextNode, handleNodeOption }) {
  const { player, nextNodes, currentNode, enemy } = useContext(playContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBuy, setIsOpenBuy] = useState(false);
  const [isOpenStance, setIsOpenStance] = useState(false);
  const [isOpenHeal, setIsOpenHeal] = useState(false);

  const renderLoading = useMemo(
    () => player.currentRoundCompleted == true && player.canChooseNode == false,
    [player]
  );

  const renderChooseNode = useMemo(() => player.canChooseNode, [player]);
  const renderNodeOptions = useMemo(
    () => player.currentRoundCompleted == false && player.canChooseNode == false,
    [player]
  );

  return (
    <div className="relative mx-auto flex h-full max-w-[1024px] flex-col justify-between overflow-hidden pt-10 lg:rounded-lg lg:border-2 lg:border-emerald-600 lg:p-4">
      <div>
        <h1 className="text-center text-4xl">
          {renderChooseNode && <>Choose Node</>} {renderNodeOptions && currentNode.type}
        </h1>
        <div className="relative flex flex-wrap justify-center">
          <div id="node-info">{enemy && <Stats entity={enemy} />}</div>

          <div className="grid place-content-center">
            <Stats entity={player} />
            <button className="button" onClick={() => setIsOpen(!isOpen)}>
              Equipment
            </button>
          </div>
        </div>
      </div>

      {/* add use item */}
      <BaseModal isOpen={isOpen} handleClose={() => setIsOpen(false)} title="Equipment">
        <Equipment
          canUse={
            currentNode.type === NODES.FIGHT &&
            Object.values(player.items || {}).length > 0
          }
          handleNodeOption={handleNodeOption}
          setIsOpen={setIsOpen}
        />
      </BaseModal>

      <div id="controller" className="h-1/2 border-t-2 border-white pt-2">
        {renderLoading && <Loading message={'Waiting for other players'} />}
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 pt-2">
          {/** To jest po akcji w nodzie, wybierasz kolejną drogę */}
          {renderChooseNode &&
            nextNodes.map((nextNode, index) => (
              <button
                className="answerBox"
                key={index}
                onClick={() => handleNextNode(nextNode.id)}
              >
                {nextNode.type}
              </button>
            ))}

          {renderChooseNode &&
            [...Array(4 - nextNodes.length).keys()].map((fakeButton) => {
              return <button className="answerBox" key={`fake-${fakeButton}`}></button>;
            })}

          {/** To akcja w nodzie, wybierasz opcje noda (params?) */}
          {renderNodeOptions && (
            <>
              {currentNode.type === NODES.SKIP && (
                <Skip handleNodeOption={handleNodeOption} />
              )}
              {currentNode.type === NODES.FIGHT && (
                <Fight
                  handleNodeOption={handleNodeOption}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isOpenStance={isOpenStance}
                  setIsOpenStance={setIsOpenStance}
                />
              )}
              {currentNode.type === NODES.HEAL && (
                <Heal
                  handleNodeOption={handleNodeOption}
                  isOpen={isOpenHeal}
                  setIsOpen={setIsOpenHeal}
                />
              )}
              {currentNode.type === NODES.MERCHANT && (
                <Merchant
                  handleNodeOption={handleNodeOption}
                  isOpen={isOpenBuy}
                  setIsOpen={setIsOpenBuy}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameView;
