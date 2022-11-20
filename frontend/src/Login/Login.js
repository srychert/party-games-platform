import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [passtype, setPasstype] = React.useState("password");

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
  function handleSubmit(e) {
    e.preventDefault();
    props.HanldeSubmit(field1, field2);
    navigate(props.destination);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form
        onSubmit={() => handleSubmit(field1, field2)}
        className="shadow-md shadow-sky-300"
      >
        <div>
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
        <div>
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
        {(props.passType && (
          <div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={() => switchPasstype()}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-3 after:left-3 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Show password
              </span>
            </label>
          </div>
        )) ||
          null}
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {props.submitName}
        </button>
      </form>
    </div>
  );
}

export default Login;
