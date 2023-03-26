import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// props -> possible buttons with destinations
// map possible buttons to Link components

function NavigationBar(props) {
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

  return (
    <div className="flex w-full flex-row justify-between bg-gray-200 p-5">
      {props.buttons.map((button, index) => (
        <button
          className="button"
          key={index}
          onClick={() => handleLocationChange(button.to)}
        >
          {button.text}
        </button>
      ))}
      <div className="flex items-center justify-center gap-4">
        <button className="button" onClick={handleLogout}>
          Logout
        </button>

        <div
          className="flex cursor-pointer flex-col items-center justify-center"
          onClick={handleShowProfile}
        >
          <IconContext.Provider value={{ size: '4em' }}>
            <CgProfile />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
