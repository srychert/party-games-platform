import { Route, Routes } from 'react-router-dom';
import Security from '../views/UserPanel/Security';
import Yours from '../views/UserPanel/Yours';
import AddQuiz from '../views/UserPanel/AddQuiz';
import Profile from '../views/UserPanel/Profile';
import NavigationBar from './NavigationBar/NavigationBar';

function ProfileLayout(props) {
  return (
    <>
      <NavigationBar profile={true} />
      <main className="container flex h-full w-full">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/security" element={<Security />} />
          <Route path="/yours" element={<Yours />} />
          <Route path="/addquiz" element={<AddQuiz />} />
        </Routes>
      </main>
    </>
  );
}

export default ProfileLayout;
