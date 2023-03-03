import React from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import Nav from '../../components/UserPanel/Nav';
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
    <div className="flex flex-col gap-20">
      <Nav />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <IconContext.Provider value={{ size: '9em' }}>
          <CgProfile />
        </IconContext.Provider>
        <div className="flex gap-4 whitespace-nowrap text-xl font-bold">
          <div className="flex flex-col">
            <span>Username:</span>
            <span>Roles:</span>
            <span>Email:</span>
            <span>Acount active:</span>
          </div>

          <div>
            <div>{user.userName}</div>
            <div>
              {user.roles &&
                user.roles.map((role) => {
                  return <span key={role}>{role}</span>;
                })}
            </div>
            <div>{user.email}</div>
            <div>{user.active ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
