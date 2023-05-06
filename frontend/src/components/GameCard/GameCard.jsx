import React from 'react';

function GameCard({ game, handleChooseGame }) {
  return (
    <div
      className="flex aspect-square min-w-[250px] flex-col rounded-lg border border-violet-600 p-4 shadow-lg shadow-violet-600"
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
        <h2 className="border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600">
          {game.title}
        </h2>
        <div className="max-h-8 overflow-hidden p-1 font-bold">{game.createdBy}</div>
        <div className="max-h-24 overflow-hidden p-1">{game.description}</div>
        <button
          className="button mt-auto"
          onClick={() => handleChooseGame(game.type, game.id)}
        >
          Graj
        </button>
      </div>
    </div>
  );
}

export default GameCard;
