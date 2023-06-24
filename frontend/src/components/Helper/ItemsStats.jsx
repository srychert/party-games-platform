function ItemsStats({ itemStats }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {itemStats.map((element, index) => (
        <>
          <div className="text-right" key={`name-${index}`}>
            {element.name}:
          </div>
          <div key={`value-${index}`}>{element.value}</div>
        </>
      ))}
    </div>
  );
}

export default ItemsStats;
