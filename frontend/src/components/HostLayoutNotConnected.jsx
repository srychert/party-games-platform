import React from 'react';
import QuizList from '../views/HostViews/QuizList';
import NavigationBar from '../components/NavigationBar/NavigationBar';

function HostLayoutNotConnected(props) {
  return (
    <>
      <NavigationBar shwoNavbarInit={true} loggedIn={true} />
      <QuizList />
    </>
  );
}

export default HostLayoutNotConnected;
