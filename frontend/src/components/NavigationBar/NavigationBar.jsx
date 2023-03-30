import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { IconContext } from 'react-icons';
import { useCookies } from 'react-cookie';
import BurgerButton from '../BurgerButton/BurgerButton';
import switchIcon from './IconMapper';

function NavigationBar({
  showNavbarInit = false,
  buttons = [],
  loggedIn = false,
  profile = false,
}) {
  const [showNavbar, setShowNavbar] = useState(showNavbarInit);
  const [cookies, setCookie] = useCookies();
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
      addedButtons.push({ to: '/addquiz', text: 'Add Quiz' });
      addedButtons.push({ to: '/logout', text: 'Logout' });
      return [...buttons, ...addedButtons];
    }

    return [...buttons, ...addedButtons];
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 -translate-x-full transition-transform sm:translate-x-0">
      <div className="flex h-full flex-col gap-2 overflow-y-auto bg-gray-50 px-3 py-4 ">
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
