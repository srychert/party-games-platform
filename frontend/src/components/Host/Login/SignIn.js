import React from 'react';

function SignIn() {
  const [username, setusername] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [email, setemail] = React.useState('');

  const [passtype, setPasstype] = React.useState('password');
  const switchPasstype = () => {
    if (passtype === 'password') {
      setPasstype('text');
    } else {
      setPasstype('password');
    }
  };
  const handleSignin = (event) => {
    event.preventDefault();
    console.log('Sign in');
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form onSubmit={(event) => handleSignin(event)} className="p-10 shadow-md shadow-sky-300">
        <div className="flex flex-col p-2">
          <label htmlFor="username">E-mail</label>
          <input
            className="form-input"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>

        <div className="flex flex-col p-2">
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
        <div className="flex flex-col p-2">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type={passtype}
            name="password"
            id="password"
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
          <button type="submit" className="button">
            Zarejestruj się
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
