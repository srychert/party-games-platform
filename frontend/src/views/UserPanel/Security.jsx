import { useState } from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import Loading from '../Loading';
import { useUpdateUser } from '../../hooks/UserHooks/useUpdateUser';

export default function Security() {
  const { isLoading, isError, data: user, error } = useUser();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [erros, setErros] = useState([]);

  const [updateElement, setUpdateElement] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const update = useUpdateUser();

  const handleUpdate = (e) => {
    const valueToUpdate = e.target.dataset.value;

    update.mutate({
      id: user.id,
      valueToUpdate,
      value: valueToUpdate === 'userName' ? userName : password,
    });
  };

  const renderErrors = () => {
    if (update.isError) {
      const messages = update.error?.response?.data;
      return (
        <ul>
          {[messages.message, messages.detailedMessages].map((error, index) => (
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
    <div className="flex justify-center items-center h-screen">
      <div className="flex max-w-[470px] flex-col rounded-lg border p-4 border-violet-600 shadow-lg shadow-violet-600 overflow-hidden">
        <div className="flex flex-col gap-10">
            <h2 className="border-b-2 border-violet-600 text-center text-2xl font-bold text-violet-600">
              {user?.userName}
            </h2>
          <div className="mx-auto flex gap-4 whitespace-nowrap text-xl font-bold">
            <div className="flex flex-col ">
              <span>Account expiry time:</span>
              <span>Credentials expiry time:</span>
            </div>

            <div className="flex flex-col">
              <span>{user.accountExpiryTime}</span>
              <span>{user.accountExpiryTime}</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              className="button"
              onClick={() => {
                setUpdateElement('userName');
                setErros([]);
              }}
            >
              Change user name
            </button>
            <button
              className="button"
              onClick={() => {
                setUpdateElement('password');
                setErros([]);
              }}
            >
              Change password
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
                  setErros([]);
                }}
              />
              {renderErrors()}
              <input
                type="button"
                className="button mt-1"
                value="Change"
                data-value="userName"
                onClick={handleUpdate}
              />
            </div>
          )}

          {updateElement === 'password' && (
            <div className="grid place-content-center">
              <label htmlFor="password">New password:</label>
              <input
                id="password"
                className="form-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="******"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErros([]);
                }}
              />
              <input
                type="button"
                className="button mt-1"
                value="Change"
                data-value="password"
                onClick={handleUpdate}
              />
              {renderErrors()}
              <div className="mt-1 flex flex-row gap-1">
                <label>Show password</label>
                <input type="checkbox" onChange={toggleShowPassword} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
