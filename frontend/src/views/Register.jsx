import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import Loading from './Loading';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const { mutate, isLoading, isError, isSuccess, error } = useRegister();

  const [passtype, setPasstype] = useState('password');
  const switchPasstype = () => {
    if (passtype === 'password') {
      setPasstype('text');
    } else {
      setPasstype('password');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    mutate({ userName, password, email });
  };

  useEffect(() => {
    let localErros = {};

    if (error?.response?.data) {
      localErros.message = error?.response?.data.message;
    }

    if (error?.response?.data?.detailedMessages) {
      error.response.data.detailedMessages.forEach((msg) => {
        if (msg.includes('email')) localErros.email = msg;
        if (msg.includes('password')) localErros.password = msg;
        if (msg.includes('userName')) localErros.userName = msg;
      });
    }

    setErrors(localErros);
  }, [error]);

  if (isError) {
    if (!error?.response?.data) {
      return <span>{error.message}</span>;
    }
  }

  if (isSuccess) {
    return <Navigate to="/login" state={{ afterRegister: true }} />;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form onSubmit={handleRegister} className="form" method="post">
        <h2 className="text-red-600">{errors.message}</h2>
        <div className="flex flex-col p-2">
          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-red-600">{errors.email}</span>
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="userName">UserName</label>
          <input
            className="form-input"
            type="text"
            name="userNa"
            id="userNa"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
          <span className="text-red-600">{errors.userName}</span>
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type={passtype}
            name="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-600">{errors.password}</span>
          <div className="mt-5">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={passtype === 'text'}
                onChange={switchPasstype}
              />
              <div className="peer h-6 w-10 rounded-full bg-gray-200 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-sky-800" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Show password
              </span>
            </label>
          </div>
        </div>
        <div className="grid w-full place-content-center ">
          {isLoading && <Loading />}
          {!isLoading && (
            <button type="submit" className="buttonRegular m-3">
              Zarejestruj się
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
