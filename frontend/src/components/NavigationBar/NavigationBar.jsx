import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

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

  const handleBurgerClick = () => {
    setShowNavbar(!showNavbar);
  };

  const buttonsToRender = useMemo(() => {
    const addedButtons = [];

    if (loggedIn) {
      addedButtons.push({ to: '/profile', text: 'Profile' });
      addedButtons.push({ to: '/logout', text: 'Logout' });
      return [...buttons, ...addedButtons];
    }

    if (profile) {
      addedButtons.push({ to: '/', text: 'Home' });
      addedButtons.push({ to: '/host', text: 'Host' });
      addedButtons.push({ to: '/profile', text: 'Profile' });
      addedButtons.push({ to: '/profile/security', text: 'Security' });
      addedButtons.push({ to: '/profile/yours', text: 'Yours' });
      addedButtons.push({ to: '/profile/add-game', text: 'Add Game' });
      addedButtons.push({ to: '/profile/add-quiz', text: 'Add Quiz' });
      addedButtons.push({ to: '/logout', text: 'Logout' });
      return [...buttons, ...addedButtons];
    }

    return [...buttons, ...addedButtons];
  }, [buttons]);

  return (
    <>
      <BurgerButton
        onClick={handleBurgerClick}
        position={`${showNavbar ? 'hidden' : 'absolute'}`}
      />
      <aside className={`flex h-full bg-gray-800 ${showNavbar ? 'block' : 'hidden'}`}>
        <div className={`flex flex-col gap-2 overflow-hidden p-2 `}>
          <BurgerButton onClick={handleBurgerClick} />
          <nav className={`flex h-full flex-col gap-2`}>
            {buttonsToRender.map((button, index) => (
              <div className={`flex items-center gap-2 last:mt-auto`} key={index}>
                <NavLink className="buttonSmall" to={button.to}>
                  <IconContext.Provider value={{ size: '2em' }}>
                    {switchIcon(button.to)}
                  </IconContext.Provider>
                </NavLink>
                <NavLink
                  className={`hidden font-semibold text-gray-100 sm:block`}
                  to={button.to}
                  tabIndex={-1}
                >
                  <span>{button.text}</span>
                </NavLink>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default NavigationBar;
