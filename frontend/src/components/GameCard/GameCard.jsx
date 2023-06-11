import React from 'react';

function GameCard({ game, handleChooseGame }) {
  return (
    <div
      className="flex h-[320px] w-[240px] flex-col rounded-lg border border-violet-600 p-4 shadow-lg shadow-violet-600 sm:h-[400px] sm:w-[300px]"
      key={game.id}
    >
      <div className="flex justify-between">
        <div className="grid aspect-square w-10 place-content-center rounded-md bg-amber-50 font-semibold">
          {game.type === 'game' ? 'G' : 'Q'}
        </div>
        <div className="grid aspect-square w-10 place-content-center rounded-md bg-amber-50 font-semibold">
          {game.totalTimesPlayed}
        </div>
      </div>

      <div className="flex h-full flex-col">
        <h2 className="h-8 overflow-hidden border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600">
          {game.title}
        </h2>
        <div className="max-h-8 overflow-hidden p-1 font-bold">{game.createdBy}</div>
        <div className="max-h-24 overflow-hidden p-1 sm:max-h-36">{game.description}</div>
        <button
          className="button mt-auto"
          onClick={() => handleChooseGame(game.type, game.id)}
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default GameCard;
