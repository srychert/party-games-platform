function EnemiesStats({ enemie }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>Health:</div>
      <div>{enemie.hp}</div>
      <div>Attack:</div>
      <div>{enemie.atk}</div>
      <div>Speed:</div>
      <div>{enemie.speed}</div>
    </div>
  );
}

export default EnemiesStats;
