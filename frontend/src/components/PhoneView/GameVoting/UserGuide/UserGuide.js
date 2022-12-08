import React from 'react';

function UserGuide() {
  const [gameItems, setGameItems] = React.useState([
    {
      id: 1,
      title: 'Miecz',
      description: 'Miecz jest bardzo ważny w grze. Możesz go użyć do ataku lub obrony.'
    },
    {
      id: 2,
      title: 'Tarcza',
      description: 'Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.'
    },
    {
      id: 2,
      title: 'Tarcza',
      description: 'Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.'
    },
    {
      id: 2,
      title: 'Tarcza',
      description: 'Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.'
    }
  ]);
  // zmienic title na obrazek
  // description na statystyki
  return (
    <div className="h-3/4 overflow-y-scroll">
      {gameItems.map((item) => (
        <div className="flex flex-row" key={item.id}>
          <div className="rounded border p-2">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="m-2 border-b-2">{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default UserGuide;
