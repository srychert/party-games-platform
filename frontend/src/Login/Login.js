import React from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [passtype, setPasstype] = React.useState(props.passtype);

  const [field1, setField1] = React.useState("");
  const [field2, setField2] = React.useState("");
  let navigate = useNavigate();
  function switchPasstype() {
    if (passtype === "password") {
      setPasstype("text");
    } else {
      setPasstype("password");
    }
  }
  function handleSubmit(event) {
    props.HanldeSubmit(event, field1, field2);
    if (props.destination) {
      navigate(props.destination);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="shadow-md shadow-sky-300 p-10"
      >
        <div className="flex flex-col p-2">
          <label htmlFor={props.field1}>{props.field1}</label>
          <input
            className="border-2 border-sky-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:border-sky-400"
            type="text"
            name={props.field1}
            id={props.field1}
            autoComplete="off"
            onChange={(e) => setField1(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-2">
          <label htmlFor={props.field2}>{props.field2}</label>
          <input
            className="border-2 border-sky-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:border-sky-400"
            type={passtype}
            name={props.field2}
            id={props.field2}
            autoComplete="off"
            onChange={(e) => setField2(e.target.value)}
          />
        </div>
        <div className="inline">
          {(props.passTypeSwitch && (
            <div className="m-2">
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={passtype === "text"}
                  onChange={switchPasstype}
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Show password
                </span>
              </label>
            </div>
          )) ||
            null}
          <button
            type="submit"
            className="p-3 m-3 border shadow-md rounded-lg hover:bg-sky-300 hover:text-white"
          >
            {props.submitName}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
