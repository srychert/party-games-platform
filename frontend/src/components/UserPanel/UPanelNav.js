import { Link } from 'react-router-dom';
import React from 'react';

export default function UPanelNav() {
  const buttonClass = 'button flex-1 text-center whitespace-nowrap';

  return (
    <nav className="flex flex-wrap justify-between gap-8 border-b-2 border-sky-600 p-10">
      <Link to={`/host`} className={buttonClass}>
        <button className="capitalize">Host</button>
      </Link>
      <Link to={`/profile`} className={buttonClass}>
        <button className="capitalize">Profile</button>
      </Link>
      <Link to={`/profile/security`} className={buttonClass}>
        <button className="capitalize">Security</button>
      </Link>
      <Link to={`/profile/yours`} className={buttonClass}>
        <button className="capitalize">Games</button>
      </Link>
      <Link to={`/addgame`} className={buttonClass}>
        <button className="capitalize">Add Game</button>
      </Link>
    </nav>
  );
}
