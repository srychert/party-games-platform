import React, { useContext } from 'react';
import playContext from '../../../context/PlayContext';
import { NODES } from '../../../enums/NodeTypes';
import getImgUrl from '../../../services/FileService';

function Action() {
  const { player, currentNode, error, enemy } = useContext(playContext);

  const ActionType = () => {
    switch (currentNode.type) {
      case NODES.SKIP:
        return <div className="text-center">SKIP</div>;
      case NODES.FIGHT:
        return (
          <div className="text-center">
            FIGHT
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Health</th>
                  <th>Damage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Player</th>
                  <th>{player.hp}</th>
                  <th>{player.atk}</th>
                </tr>
                <tr>
                  <th>
                    <img
                      src={getImgUrl(`${enemy.path}`)}
                      alt={enemy.type}
                      className="m-auto h-8 w-8"
                    />
                  </th>
                  <th>{enemy.hp}</th>
                  <th>{enemy.atk}</th>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case NODES.HEAL:
        return <div className="text-center">HEAL</div>;
      case NODES.MERCHANT:
        return <div className="text-center">MERCHANT</div>;
      default:
        return <div className="text-center">BAD NODE?</div>;
    }
  };

  return (
    <div className="flex-col">
      {ActionType()}
      {error && <div>{error}</div>}
    </div>
  );
}

export default Action;
