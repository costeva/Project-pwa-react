import React from "react";
import logo from "../../assets/star-wars-4.svg";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <header className="flex justify-center my-5">
      <nav className="w-full">
        <div className="container mx-auto flex justify-around px-5 py-4">
          <Link to={"/home"} className="flex items-center">
            <img src={logo} alt="logo" className="h-12 w-30" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
