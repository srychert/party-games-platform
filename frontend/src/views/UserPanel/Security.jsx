import { useState, useEffect } from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import Loading from '../Loading';
import { useUpdateUser } from '../../hooks/UserHooks/useUpdateUser';
import { IconContext } from 'react-icons';
import { CgLock, CgLockUnlock } from 'react-icons/cg';

export default function Security() {
  const { isLoading, isError, data: user, error } = useUser();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [updateElement, setUpdateElement] = useState('');
  const [passtype, setPasstype] = useState('password');
  const [errors, setErrors] = useState([]);

  function switchPasstype() {
    if (passtype === 'password') {
      setPasstype('text');
    } else {
      setPasstype('password');
    }
  }

  const update = useUpdateUser();

  const handleUpdate = (e) => {
    const valueToUpdate = e.target.dataset.value;

    update.mutate({
      id: user.id,
      valueToUpdate,
      user: {
        ...user,
        userName: updateElement === 'userName' ? userName : user.userName,
        password: updateElement === 'password' ? password : 'emptyPasword123@',
        email: updateElement === 'email' ? email : user.email,
      },
    });
  };

  useEffect(() => {
    const messages = update.error?.response?.data;
    let errorsToSet = [messages?.message];

    if (messages?.detailedMessages) {
      errorsToSet = [...errorsToSet, ...messages.detailedMessages];
    }

    setErrors(errorsToSet);
  }, [update?.error]);

  const renderErrors = () => {
    if (update.isError) {
      return (
        <ul>
          {errors.map((error, index) => (
            <li className="text-[red]" key={index}>
              {error}
            </li>
          ))}
        </ul>
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="m-2 flex max-w-[500px] flex-col rounded-lg border border-violet-600 p-4 shadow-lg shadow-violet-600">
        <div className="flex flex-col gap-8">
          <h2 className="border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600">
            {user?.userName}
          </h2>
          <div className="grid gap-4 text-xl font-bold">
            <div className="flex flex-wrap justify-between gap-2">
              <span>Account expiry time:</span>
              <span>{user.accountExpiryTime}</span>
            </div>

            <div className="flex flex-wrap justify-between gap-2">
              <span>Credentials expiry time:</span>
              <span>{user.accountExpiryTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="button"
              onClick={() => {
                setUpdateElement('userName');
                setErrors([]);
              }}
            >
              Change userName
            </button>
            <button
              className="button"
              onClick={() => {
                setUpdateElement('password');
                setErrors([]);
              }}
            >
              Change password
            </button>
            <button
              className="button"
              onClick={() => {
                setUpdateElement('email');
                setErrors([]);
              }}
            >
              Change email
            </button>
          </div>
          <h2 className="border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600"></h2>
          {updateElement === 'userName' && (
            <div className="grid place-content-center">
              <label htmlFor="user-name">New user name:</label>
              <input
                id="user-name"
                className="form-input"
                type="text"
                placeholder={user?.userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              {renderErrors()}
              <button
                className="button mt-1"
                data-value="password"
                onClick={handleUpdate}
              >
                Change
              </button>
            </div>
          )}

          {updateElement === 'password' && (
            <div className="grid place-content-center">
              <label htmlFor="password">New password:</label>
              <div className="relative">
                <input
                  id="password"
                  className="form-input"
                  type={passtype}
                  placeholder="******"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <IconContext.Provider
                  value={{
                    size: '1.25em',
                    style: {
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      zIndex: 2,
                      cursor: 'pointer',
                    },
                  }}
                >
                  {passtype === 'password' ? (
                    <CgLock onClick={switchPasstype} />
                  ) : (
                    <CgLockUnlock onClick={switchPasstype} />
                  )}
                </IconContext.Provider>
              </div>
              {renderErrors()}
              <button
                className="button mt-1"
                data-value="password"
                onClick={handleUpdate}
              >
                Change
              </button>
            </div>
          )}

          {updateElement === 'email' && (
            <div className="grid place-content-center">
              <label htmlFor="user-name">New email:</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder={user?.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {renderErrors()}
              <button className="button mt-1" data-value="email" onClick={handleUpdate}>
                Change
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
