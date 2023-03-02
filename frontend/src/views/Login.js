import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import { useLogin } from '../hooks/useLogin';

function Login(props) {
  const [passtype, setPasstype] = useState(props.passtype);

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const { mutate, isLoading, isError, isSuccess, error } = useLogin(username, password);

  const navigate = useNavigate();

  function switchPasstype() {
    if (passtype === 'password') {
      setPasstype('text');
    } else {
      setPasstype('password');
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
    mutate({ username, password });
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Back to={'/'} />
      <form onSubmit={(event) => handleLogin(event)} className="form">
        <div className="flex flex-col p-2">
          <label htmlFor={props.username}>Login</label>
          <input
            className="form-input"
            type="text"
            name={props.username}
            id={props.username}
            autoComplete="off"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor={props.password}>Password</label>
          <input
            className="form-input"
            type={passtype}
            name={props.password}
            id={props.password}
            autoComplete="off"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="inline">
          <div className="m-2">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={passtype === 'text'}
                onChange={switchPasstype}
              />
              <div className="peer h-6 w-10 rounded-full bg-gray-200 after:absolute after:top-1 after:left-1 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-sky-800" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Show password
              </span>
            </label>
          </div>
          <div>
            <button type="submit" className="button m-3">
              Zaloguj
            </button>
            <button
              type="button"
              className="button m-3"
              onClick={() => navigate('/register')}
            >
              {' '}
              Zarejestruj się{' '}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
