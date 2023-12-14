import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to="/">
            <img src={logo}></img>
          </Link>
        </div>
        <div className="gpt3__navbar-links_container">
          <Link to="/about">
            <p className="rules">Rules</p>
          </Link>
          <p>
            <Link to="/services">About us</Link>
          </p>
        </div>
      </div>
      <NavLink to="/signup">
        <div className="gpt3__navbar-sign">
          <button type="button">Add account</button>
        </div>
      </NavLink>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#000"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#000"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p>
                <NavLink to="/about">About Us</NavLink>
              </p>
              <p>
                <NavLink to="/services">Services</NavLink>
              </p>
              <p>
                <NavLink to="/career">Carrers</NavLink>
              </p>
              <p>
                <NavLink to="/contact">Contact Us</NavLink>
              </p>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
              <NavLink to="/signup">
                <button type="button">Signup</button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
