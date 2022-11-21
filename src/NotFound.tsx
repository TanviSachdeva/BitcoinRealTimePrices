import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>404! Page NotFound</div>
      <Link to="/">Dashboard</Link>
    </>
  );
};

export default NotFound;
