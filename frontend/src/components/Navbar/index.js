import React from "react";
import {
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLogo to="/home">Logo</NavLogo>
        <Bars />

        <NavMenu>
          <NavLink to="/home" activeStyle={{ color: "black" }}>
            Home
          </NavLink>
          <NavLink to="/api/add-user" activeStyle={{ color: "black" }}>
            Add User
          </NavLink>
          <NavLink to="/api/update-user" activeStyle={{ color: "black" }}>
            Update User
          </NavLink>
          <NavLink to="/api/delete-user" activeStyle={{ color: "black" }}>
            Delete User
          </NavLink>
          
          <NavBtn>
            <NavBtnLink to="/api/browse/repository-users">
              Browse Users
            </NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};
export default Navbar;
