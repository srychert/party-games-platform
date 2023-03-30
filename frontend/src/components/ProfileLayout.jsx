import { Route, Routes } from 'react-router-dom';
import Security from '../views/UserPanel/Security';
import Yours from '../views/UserPanel/Yours';
import AddQuiz from '../views/UserPanel/AddQuiz';
import Profile from '../views/UserPanel/Profile';

function ProfileLayout(props) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/security" element={<Security />} />
        <Route path="/yours" element={<Yours />} />
        <Route path="/addquiz" element={<AddQuiz />} />
      </Routes>
    </>
  );
}

export default ProfileLayout;
