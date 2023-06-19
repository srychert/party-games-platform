import React from 'react';
import { IconContext } from 'react-icons';
import { LuSwords, LuHeart } from 'react-icons/lu';
import { GiWhirlwind } from 'react-icons/gi';
import { BiCoin } from 'react-icons/bi';
import { formatText } from '../../../services/formatText';
import getImgUrl from '../../../services/FileService';

function Stats({ entity }) {
  return (
    <div className="w-[290px]">
      <h2 className="text-center text-2xl capitalize">
        {entity.nick ? entity.nick : formatText(entity.type)}
      </h2>
      <div
        className={`m-1 flex gap-4 rounded border border-slate-50 p-4 ${
          entity?.died ? 'grayscale' : ''
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          {<img src={getImgUrl(entity.path || 'knight.png')} className="h-16 w-16"></img>}
          <span className="text-lg font-bold">{entity.stance}</span>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 text-xl font-bold">
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div className="flex items-center gap-2">
              <LuSwords color="#2563eb" />
              <span>{entity.atk} </span>
            </div>

            <div className="flex items-center gap-2">
              <LuHeart color="#e11d48" />
              <span>{entity?.died ? 0 : entity.hp}</span>
            </div>

            <div className="flex items-center gap-2">
              <GiWhirlwind color="#ca8a04" />
              <span>{entity.speed}</span>
            </div>

            <div className="flex items-center gap-2">
              <BiCoin color="#059669" />
              <span>{entity?.gold ? entity.gold : entity?.loot?.gold}</span>
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default Stats;
