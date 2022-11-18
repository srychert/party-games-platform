import React from "react";

import "./hero-stats.css";

function HeroStats() {
  const [heroName, setHeroName] = React.useState("PlaceHolder");
  const [heroLevel, setHeroLevel] = React.useState("1");
  const [heroHealth, setHeroHealth] = React.useState("100");
  const [heroMana, setHeroMana] = React.useState("100");

  return (
    <div className="hero-menu">
      <div className="hero-image">
        <img src="" alt="hero" />
        <div className="hero-level">{heroLevel}</div>
      </div>
      <div className="hero-stats">
        <div className="hero-name">{heroName}</div>
        <div className="hero-health">Życie: {heroHealth}</div>
        <div className="hero-mana">Mana: {heroMana}</div>
      </div>
    </div>
  );
}

export default HeroStats;
