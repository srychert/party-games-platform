import React from 'react';

function HeroStats() {
  const [heroName, setHeroName] = React.useState('PlaceHolder');
  const [heroLevel, setHeroLevel] = React.useState('1');
  const [heroHealth, setHeroHealth] = React.useState('100');
  const [heroMana, setHeroMana] = React.useState('100');

  return (
    <div className="flex h-3/4 w-screen">
      <div className="m-2 rounded border border-cyan-200 p-2">
        <img src="" alt="hero" />
        <div className="hero-level">{heroLevel}</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="justify-self-center">{heroName}</div>
        <div className="">Życie: {heroHealth}</div>
        <div className="">Mana: {heroMana}</div>
      </div>
    </div>
  );
}

export default HeroStats;
