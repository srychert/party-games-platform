import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import HostLayoutConnected from './HostLayoutConnected';
import HostLayoutNotConnected from './HostLayoutNotConnected';

function HostLayout(props) {
  return (
    <>
      <NavigationBar
        buttons={[
          { to: '/', text: 'Home' },
          { to: '/host', text: 'Host' },
        ]}
        showNavbarInit={true}
        loggedIn={true}
      />
      <main className="h-full w-full">
        <Routes>
          <Route path="/" element={<HostLayoutNotConnected {...props} />} />
          <Route path="/*" element={<HostLayoutConnected {...props} />} />
        </Routes>
      </main>
    </>
  );
}

export default HostLayout;
