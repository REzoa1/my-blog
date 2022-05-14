import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export const NavLinkForm = ({ link, icon }) => {
  return (
    <NavLink exact activeClassName="active" className="sidebar__link" to={link.path}>
      <FontAwesomeIcon icon={icon} className="sidebar__icons" />
      {link.name}
      <FontAwesomeIcon icon={faCircle} className="sidebar__dot" />
    </NavLink>
  );
};
