import { Link } from 'react-router-dom';
import React from 'react';

export default function UPanelNav() {
  const buttonClass = 'flex flex-col justify-center items-center h-1/2 w-1/2 button m-5';
  return (
    <nav className="flex flex-row items-center justify-center border-b-2 border-sky-600">
      <Link to={`/host`} className={buttonClass}>
        <button className="capitalize">Host</button>
      </Link>
      <Link to={`/profile`} className={buttonClass}>
        <button className="capitalize">konto</button>
      </Link>
      <Link to={`/profile/security`} className={buttonClass}>
        <button className="capitalize">bezpieczeństwo</button>
      </Link>
      <Link to={`/profile/yours`} className={buttonClass}>
        <button className="capitalize">twoje gry</button>
      </Link>
      <Link to={`/addgame`} className={buttonClass}>
        <button className="capitalize">dodaj grę</button>
      </Link>
    </nav>
  );
}
