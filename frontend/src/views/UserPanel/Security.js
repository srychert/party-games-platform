import Nav from '../../components/UserPanel/Nav';
import { useState } from 'react';
import useUser from '../../hooks/UserHooks/useUser';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../Loading';
import { useUpdateUser } from '../../hooks/UserHooks/useUpdateUser';

export default function Security() {
  const { api, logout } = useAuth();
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

  const handelUpdate = (e) => {
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
    <div className="flex flex-col gap-10">
      <Nav />

      <div className="mx-auto flex gap-4 whitespace-nowrap text-xl font-bold">
        <div className="flex flex-col">
          <span>Username:</span>
          <span>Account expiry time:</span>
          <span>Credentials expiry time:</span>
        </div>

        <div className="flex flex-col">
          <span>{user.userName}</span>
          <span>{user.accountExpiryTime}</span>
          <span>{user.accountExpiryTime}</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <button
          className="btn-form"
          onClick={() => {
            setUpdateElement('userName');
            setErros([]);
          }}
        >
          Change username
        </button>
        <button
          className="btn-form"
          onClick={() => {
            setUpdateElement('password');
            setErros([]);
          }}
        >
          Change password
        </button>
      </div>

      {updateElement === 'userName' && (
        <div className="grid place-content-center">
          <label htmlFor="user-name">New userName:</label>
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
            className="btn-form mt-1"
            value="Change"
            data-value="userName"
            onClick={handelUpdate}
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
            className="btn-form mt-1"
            value="Change"
            data-value="password"
            onClick={handelUpdate}
          />
          {renderErrors()}
          <div className="mt-1 flex flex-row gap-1">
            <label>Show password</label>
            <input type="checkbox" onChange={toggleShowPassword} />
          </div>
        </div>
      )}
    </div>
  );
}
