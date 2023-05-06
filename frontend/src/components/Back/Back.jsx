import React from 'react';
import { Link } from 'react-router-dom';

function Back(props) {
  return (
    <Link to={props.to} className="button absolute left-10 top-10">
      Back
    </Link>
  );
}

export default Back;
