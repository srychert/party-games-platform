import React from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import FinalResults from '../views/HostViews/FinalResults';

function GeneralLayout() {
  return (
    <>
      <NavigationBar buttons={[{ to: '/', text: 'Home' }]} showNavbarInit={true} />
      <main className="h-full w-full">
        <Routes>
          <Route path="/final-results" element={<FinalResults />} />
        </Routes>
      </main>
    </>
  );
}

export default GeneralLayout;
