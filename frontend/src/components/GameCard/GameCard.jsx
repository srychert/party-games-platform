import React from 'react';

function GameCard({ game, handleChooseGame }) {
  return (
    <div className="game-card" key={game.id}>
      <h1 className="game-numberPlayed">{game.totalTimesPlayed}</h1>
      <div className="flex h-full flex-col">
        <h2 className="border-b-2 border-sky-300 text-2xl capitalize">{game.title}</h2>
        <div className="max-h-8 overflow-hidden p-1 font-bold">{game.createdBy}</div>
        <div className="max-h-24 overflow-hidden p-1">{game.description}</div>
        <button
          className="buttonRegular mt-auto"
          onClick={() => handleChooseGame(game.id)}
        >
          Graj
        </button>
      </div>
    </div>
  );
}

export default GameCard;
