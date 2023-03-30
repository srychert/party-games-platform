import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { CgProfile, CgHome } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="flex w-full flex-row justify-between bg-gray-200 p-5">
      <BurgerButton onClick={handelBurgerClick} />
      {showNavbar ? (
        <nav className="flex flex-row justify-between">
          {buttons.map((button, index) => (
            <button
              className="buttonSmall"
              key={index}
              onClick={() => handleLocationChange(button.to)}
            >
              <IconContext.Provider value={{ size: '2em' }}>
                {/* TODO use NavLink component from react router instead of buttons */}
                {switchButton(button.to)}
              </IconContext.Provider>
            </button>
          ))}
          {loggedIn ? (
            <div className="flex items-center justify-center gap-4">
              <button className="buttonSmall" onClick={handleLogout}>
                <IconContext.Provider value={{ size: '2em' }}>
                  {switchButton('/logout')}
                </IconContext.Provider>
              </button>

              <div
                className="flex cursor-pointer flex-col items-center justify-center"
                onClick={handleShowProfile}
              >
                <IconContext.Provider value={{ size: '2em' }}>
                  <CgProfile />
                </IconContext.Provider>
              </div>
            </div>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}

export default NavigationBar;
