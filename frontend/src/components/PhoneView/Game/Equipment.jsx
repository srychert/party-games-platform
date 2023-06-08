import React, { useContext } from 'react';

import playContext from '../../../context/PlayContext';
import { itemTypeToString } from '../../../services/ItemTypeToString';
import getImgUrl from '../../../services/FileService';

function Equipment() {
  const { player, nodes } = useContext(playContext);
  console.log(player, nodes);

  return (
    <>
      <div>
        {player.gold}
        <div>
          {player.items ? (
            <div>
              {Object.keys(player.items)
                .map((key) => player.items[key])
                .map((item, index) => (
                  <div value={item.id} key={index} className="flex-row justify-center">
                    <div>
                      <img
                        src={getImgUrl(`${item.path}`)}
                        alt={item.name}
                        className="m-auto h-12 w-12"
                      />
                      <div>
                        {itemTypeToString(item.type)} {item.cost}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Equipment;
