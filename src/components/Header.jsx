import React from "react";
import logo from "../logo.svg";

const Header = () => {
  return (
    <header className="header">
      <img className="header_logo" src={logo} alt="" />
      <span className="header_text">First React App</span>
    </header>
  );
};

export default Header;
