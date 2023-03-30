import {
  CgHomeAlt,
  CgLogOff,
  CgBot,
  CgDice1,
  CgMenu,
  CgProfile,
  CgLock,
  CgTrash,
  CgAdd,
} from 'react-icons/cg';

const switchIcon = (button) => {
  switch (button) {
    case '/':
      return <CgHomeAlt />;
    case '/logout':
      return <CgLogOff />;
    case '/player':
      return <CgBot />;
    case '/host':
      return <CgDice1 />;
    case '/profile':
      return <CgProfile />;
    case '/profile/security':
      return <CgLock />;
    case '/profile/yours':
      return <CgTrash />;
    case '/addquiz':
      return <CgAdd />;

    default:
      return <CgMenu />;
  }
};

export default switchIcon;
