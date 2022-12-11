import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/UserHooks/useUser';
import UPanelNav from './UPanelNav';

function UserPanel() {
  const { id } = useParams();
  const userData = useUser(id);

  return (
    <div className="flex flex-col gap-20">
      <UPanelNav id={id} />
      <div className="flex flex-row items-center justify-center space-x-16">
        <div className="mb-4">
          <img
            src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg"
            alt="profilePic"
            className="h-80 w-80 rounded-full border-2 border-sky-600"
          />
        </div>
        <div>
          <div>Username: {userData.userName}</div>
          <div>Roles: {userData.roles}</div>
          <div>Email: {userData.email}</div>
          <div>Acount active: {userData.active ? 'Tak' : 'Nie'}</div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
