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
  CgTrophy,
  CgSandClock,
  CgBell,
  CgPill,
  CgToolbox,
  CgClose,
} from 'react-icons/cg';

const switchIcon = (button) => {
  switch (button) {
    case 'menu':
      return <CgMenu />;
    case 'menuOpen':
      return <CgClose />;
    case 'gameAction':
      return <CgBell />;
    case 'stats':
      return <CgPill />;
    case 'equipment':
      return <CgToolbox />;
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
    case '/profile/addquiz':
      return <CgAdd />;
    case '/player/join':
      return <CgTrophy />;
    default:
      return <CgSandClock />;
  }
};

export default switchIcon;
