import {
  CgHomeAlt,
  CgLogOff,
  CgBot,
  CgDice1,
  CgMenu,
  CgProfile,
  CgLock,
  CgAdd,
  CgAddR,
  CgTrophy,
  CgSandClock,
  CgBell,
  CgPill,
  CgToolbox,
  CgClose,
  CgChevronLeftR,
  CgChevronRightR,
  CgInfo,
  CgList,
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
      return <CgList />;
    case '/profile/add-game':
      return <CgAddR />;
    case '/profile/add-quiz':
      return <CgAdd />;
    case '/player/join':
      return <CgTrophy />;
    case '/help/right':
      return <CgChevronRightR />;
    case '/help/left':
      return <CgChevronLeftR />;
    case '/helper':
      return <CgInfo />;
    default:
      return <CgSandClock />;
  }
};

export default switchIcon;
