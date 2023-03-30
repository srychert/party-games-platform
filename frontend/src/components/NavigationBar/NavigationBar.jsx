import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { IconContext } from 'react-icons';
import { useCookies } from 'react-cookie';
import BurgerButton from '../BurgerButton/BurgerButton';
import switchButton from './IconMapper';

// props -> possible buttons with destinations
// map possible buttons to Link components

function NavigationBar({ showNavbarInit = false, buttons = [], loggedIn = false }) {
  const [showNavbar, setShowNavbar] = useState(showNavbarInit);
  const [cookies, setCookie] = useCookies();
  const auth = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
  };

  const handleShowProfile = () => {
    navigate(`/profile`);
  };

  const handleLocationChange = (to) => {
    navigate(to);
  };

  const handelBurgerClick = () => {
    setShowNavbar(!showNavbar);
    console.log('burger clicked');
  };

  useEffect(() => {
    if (loggedIn) {
      buttons.push({ to: '/profile', text: 'Host' });
      buttons.push({ to: '/logout', text: 'Logout' });
    }
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 -translate-x-full transition-transform sm:translate-x-0">
      <div className="flex h-full flex-col gap-2 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <BurgerButton onClick={handelBurgerClick} />
        {showNavbar ? (
          <nav className="flex flex-col justify-between gap-2">
            {buttons.map((button, index) => (
              <button
                className="buttonSmall"
                key={index}
                onClick={() => handleLocationChange(button.to)}
              >
                <IconContext.Provider value={{ size: '2em' }}>
                  {switchButton(button.to)}
                </IconContext.Provider>
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </aside>
  );
}

export default NavigationBar;
