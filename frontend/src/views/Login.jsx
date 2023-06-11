import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import { useLogin } from '../hooks/useLogin';
import Loading from './Loading';
import { IconContext } from 'react-icons';
import { CgLock, CgLockUnlock } from 'react-icons/cg';

function Login(props) {
  const [passtype, setPasstype] = useState('password');

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const { mutate, isLoading, isError, isSuccess, error } = useLogin();

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

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return <Navigate to="/host" state={{ loginSuccess: true }} />;
  }

  return (
    <div className="full-screen-container">
      <Back to={'/'} />
      <form id="login-form" onSubmit={(event) => handleLogin(event)} className="form">
        <div className="form-row">
          <div className="form-input-container">
            <label htmlFor="username">Login</label>
            <input
              className="form-input"
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-input-container">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                className="form-input pr-8"
                type={passtype}
                name="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setpassword(e.target.value)}
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
          </div>
        </div>

        <div className="form-row">
          <button type="submit" className="button flex-1">
            Login
          </button>
          <button
            type="button"
            className="button flex-1"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
        {isError && (
          <span className="font-semibold text-red-600">
            {error?.response?.status === 401
              ? 'Wrong credentials'
              : 'Something went wrong try again later'}
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
