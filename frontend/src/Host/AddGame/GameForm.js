import React from "react";

function GameForm() {
  return (
    <div className="game-form">
      <h1> Stwórz nową grę</h1>
      <form>
        <label htmlFor="game-name">Nazwa gry</label>
        <input type="text" id="game-name" name="game-name" />
        <label htmlFor="game-pin">Dozwolone ruchy</label>
        <select name="possible-moves" id="possible-moves" multiple>
          <option value="rock">Kamień</option>
          <option value="paper">Papier</option>
          <option value="scissors">Nożyce</option>
        </select>
      </form>
    </div>
  );
}

export default GameForm;
