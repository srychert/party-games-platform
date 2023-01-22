import React, { useState } from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import UPanelNav from './UPanelNav';

function UserPanel() {
  const userData = useUser();

  return (
    <div className="flex flex-col gap-20">
      <UPanelNav />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <span className="material-symbols-outlined text-9xl">account_circle</span>
        <div className="flex gap-4 whitespace-nowrap text-xl font-bold">
          <div className="flex flex-col">
            <span>Username:</span>
            <span>Roles:</span>
            <span>Email:</span>
            <span>Acount active:</span>
          </div>

          <div>
            <div>{userData.userName}</div>
            <div>
              {userData.roles &&
                userData.roles.map((role) => {
                  return <span key={role}>{role}</span>;
                })}
            </div>
            <div>{userData.email}</div>
            <div>{userData.active ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
