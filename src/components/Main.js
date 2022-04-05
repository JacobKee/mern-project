import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function Main() {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };

  return (
    <div>
      <h1 style={mystyle}>Main!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/token">Token</Link>
          </li>
          <li>
            <Link to="/network">Network</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Main;
