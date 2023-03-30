import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { IconContext } from 'react-icons';
import BurgerButton from '../BurgerButton/BurgerButton';
import switchIcon from './IconMapper';

function NavigationBar({
  showNavbarInit = false,
  buttons = [],
  loggedIn = false,
  profile = false,
}) {
  const [showNavbar, setShowNavbar] = useState(showNavbarInit);
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  const handelBurgerClick = () => {
    setShowNavbar(!showNavbar);
    console.log('burger clicked');
  };

  const buttonsToRender = () => {
    const addedButtons = [];

    if (loggedIn) {
      addedButtons.push({ to: '/', text: 'Home' });
      addedButtons.push({ to: '/profile', text: 'Host' });
      addedButtons.push({ to: '/logout', text: 'Logout' });
      return [...buttons, ...addedButtons];
    }

    if (profile) {
      addedButtons.push({ to: '/', text: 'Home' });
      addedButtons.push({ to: '/host', text: 'Host' });
      addedButtons.push({ to: '/profile', text: 'Profile' });
      addedButtons.push({ to: '/profile/security', text: 'Security' });
      addedButtons.push({ to: '/profile/yours', text: 'Quizzes' });
      addedButtons.push({ to: '/profile/addquiz', text: 'Add Quiz' });
      addedButtons.push({ to: '/logout', text: 'Logout' });
      return [...buttons, ...addedButtons];
    }

    return [...buttons, ...addedButtons];
  };

  return (
    <aside className="z-40 flex h-screen w-20 -translate-x-full justify-center bg-gray-300 transition-transform sm:translate-x-0">
      <div className="flex h-full flex-col gap-2 overflow-y-auto px-3 py-4 ">
        <BurgerButton onClick={handelBurgerClick} />
        {showNavbar ? (
          <nav className="flex flex-col justify-between gap-2">
            {buttonsToRender().map((button, index) => (
              <NavLink className="buttonSmall" key={index} to={button.to}>
                <IconContext.Provider value={{ size: '2em' }}>
                  {switchIcon(button.to)}
                </IconContext.Provider>
              </NavLink>
            ))}
          </nav>
        ) : null}
      </div>
    </aside>
  );
}

export default NavigationBar;
