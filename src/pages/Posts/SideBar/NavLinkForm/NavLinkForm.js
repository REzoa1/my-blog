import React from "react";
import { NavLink } from "react-router-dom";

export const NavLinkForm = ({ to, src }) => {
  return (
    <NavLink exact activeClassName="active" className="link" to={to.path}>
      <img className="link__icons" src={src} alt={to.name} />
      {to.name}
    </NavLink>
  );
};
