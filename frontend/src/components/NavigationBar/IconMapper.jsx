import { CgHomeAlt, CgLogOff, CgBot, CgAdidas, CgMenu, CgProfile } from 'react-icons/cg';

const switchButton = (button) => {
  switch (button) {
    case '/':
      return <CgHomeAlt />;
    case '/logout':
      return <CgLogOff />;
    case '/player':
      return <CgBot />;
    case '/host':
      return <CgAdidas />;
    case '/profile':
      return <CgProfile />;
    default:
      return <CgMenu />;
  }
};

export default switchButton;
