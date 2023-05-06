import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import Loading from './Loading';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { CgLock, CgLockUnlock } from 'react-icons/cg';
import Back from '../components/Back/Back';

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
    <div className="full-screen-container">
      <Back to={'/'} />
      <form onSubmit={handleRegister} className="form" method="post">
        <h2 className="text-red-600">{errors.message}</h2>

        <div className="form-row">
          <div className="form-input-container">
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
        </div>

        <div className="form-row">
          <div className="form-input-container">
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
                onChange={(e) => setPassword(e.target.value)}
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
            <span className="text-red-600">{errors.password}</span>
          </div>
        </div>

        <div className="grid w-full place-content-center">
          {isLoading && <Loading />}
          {!isLoading && (
            <button type="submit" className="button">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
