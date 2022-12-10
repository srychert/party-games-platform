import { Link } from 'react-router-dom';
import React from 'react';

export default function UPanelNav() {
  const buttonClass = 'flex flex-col justify-center items-center h-1/2 w-1/2 button';
  return (
    <nav className="flex flex-row items-center justify-center">
      <Link to={'/userpanel'} className={buttonClass}>
        <button>konto</button>
      </Link>
      <Link to={'/userpanel/security'} className={buttonClass}>
        <button>bezpieczeństwo</button>
      </Link>
      <Link to={'/userpanel/yours'} className={buttonClass}>
        <button>twoje gry</button>
      </Link>
      <Link to={'/userpanel/history'} className={buttonClass}>
        <button>historia</button>
      </Link>
    </nav>
  );
}
