function EnemiesStats({ enemie }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="text-right">Health:</div>
      <div>{enemie.hp}</div>
      <div className="text-right">Attack:</div>
      <div>{enemie.atk}</div>
      <div className="text-right">Speed:</div>
      <div>{enemie.speed}</div>
    </div>
  );
}

export default EnemiesStats;
