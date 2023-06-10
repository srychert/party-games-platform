function ItemsStats({ itemStats }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {itemStats.map((element, index) => (
        <>
          <div>{element.name}:</div>
          <div>{element.value}</div>
        </>
      ))}
    </div>
  );
}

export default ItemsStats;
