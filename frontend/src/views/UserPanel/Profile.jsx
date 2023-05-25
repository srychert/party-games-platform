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
    <div className="flex justify-center items-center h-screen -mt-20">
    <div className="flex aspect-square min-w-[400px] flex-col rounded-lg border border-violet-600 shadow-lg shadow-violet-600 overflow-hidden">
        <div className="flex h-full w-full flex-col overflow-y-scroll p-4">
          <div className="flex justify-center">
            <IconContext.Provider value={{ size: '9em' }}>
              <CgProfile />
            </IconContext.Provider>
          </div>
          <h2 className="border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600">
            {user?.userName}
          </h2>
          <div className="flex justify-center mt-10 text-center">
            <div className="flex gap-6 whitespace-nowrap text-xl font-bold">
              <div className="flex flex-col gap-5">
                <span>Roles:</span>
                <span>Email:</span>
              </div>
              <div className="flex flex-col gap-5">
                <div>
                  {user?.roles?.map((role) => {
                    return <span key={role}>{role}</span>;
                  })}
                </div>
                <div>{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`self-end text-center w-full ${user?.active ? 'bg-green-500' : 'bg-red-500'} font-semibold h-[30px]`}>{user?.active ? 'Active: Yes' : 'Active: No'}</div>
      </div>
    </div>
  );
}

export default Profile;
