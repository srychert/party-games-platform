import React from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import Loading from '../Loading';

function Profile() {
  const { isLoading, isError, data: user, error } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-scroll">
      <div className="flex justify-center">
        <IconContext.Provider value={{ size: '9em' }}>
          <CgProfile />
        </IconContext.Provider>
      </div>

      <div className="flex gap-4 whitespace-nowrap text-xl font-bold">
        <div className="flex flex-col">
          <span>Username:</span>
          <span>Roles:</span>
          <span>Email:</span>
          <span>Active:</span>
        </div>

        <div>
          <div>{user?.userName}</div>
          <div>
            {user?.roles?.map((role) => {
              return <span key={role}>{role}</span>;
            })}
          </div>
          <div>{user?.email}</div>
          <div>{user?.active ? 'Yes' : 'No'}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
