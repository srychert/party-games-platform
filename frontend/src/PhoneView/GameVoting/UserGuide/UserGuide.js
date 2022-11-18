import React from "react";

import "./user-guide.css";

function UserGuide() {
  const [gameItems, setGameItems] = React.useState([
    {
      id: 1,
      title: "Miecz",
      description:
        "Miecz jest bardzo ważny w grze. Możesz go użyć do ataku lub obrony.",
    },
    {
      id: 2,
      title: "Tarcza",
      description: "Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.",
    },
    {
      id: 2,
      title: "Tarcza",
      description: "Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.",
    },
    {
      id: 2,
      title: "Tarcza",
      description: "Tarcza jest bardzo ważna w grze. Możesz ją użyć do obrony.",
    },
  ]);
  // zmienic title na obrazek
  // description na statystyki
  return (
    <div className="user-guide__content">
      {gameItems.map((item) => (
        <div className="user-guide__content__item" key={item.id}>
          <div className="user-guide-img">
            <img src={item.img} alt={item.title} />
          </div>
          <div className="user-guide-description">{item.description}</div>
        </div>
      ))}
    </div>
  );
}

export default UserGuide;
