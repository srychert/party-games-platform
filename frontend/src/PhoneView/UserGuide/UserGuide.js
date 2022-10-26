import React from "react";

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
  ]);
  // zmienic title na obrazek
  // description na statystyki
  return (
    <div className="user-guide__content">
      {gameItems.map((item) => (
        <div className="user-guide__content__item" key={item.id}>
          <p>
            {item.title}: {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserGuide;

/* <div id="nav-container">
    <div class="bg"></div>
    <div class="button" tabindex="0">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </div>
    <div id="nav-content" tabindex="0">
      <ul>
        <li><a href="#0">Home</a></li>
        <li><a href="#0">Services</a></li>
        <li><a href="#0">Blog</a></li>
        <li><a href="#0">About</a></li>
        <li><a href="#0">Contact</a></li>
        <li class="small"><a href="#0">Facebook</a><a href="#0">Instagram</a></li>
      </ul>
    </div>
  </div> */
