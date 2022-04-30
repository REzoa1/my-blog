import { links } from "./Link/link";
import "./SideBar.css";
// import search from "./../../../assets/img/svg/search.svg";
import blog from "./../../../assets/img/svg/blog.svg";
import star from "./../../../assets/img/svg/star.svg";
import settings from "./../../../assets/img/svg/settings.svg";
import add from "./../../../assets/img/svg/add.svg";


import { LogOut } from "./LogOut/LogOut";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
// import { Form } from "../Posts/Form/Form";

export const SideBar = ({
  setIsFormOpen,
  userName,
  avatar
}) => {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const openForm = () => setIsFormOpen(true);
  // console.log(isFormOpen);
  // const avatar = localStorage.getItem("avatar")
  
  return (
    <div>
      <aside className="side_bar">
        <div className="user">
          <div className="avatar">
            <img src={avatar} alt="" />
          </div>
          <h1 className="app">{userName}</h1>
        </div>
        {/* <div className="search">
          <img
            href="#"
            className="link__icons search--icon"
            src={search}
            alt="Search"
          />
          <input className="search__input" type="text" placeholder="Найти" />
        </div> */}
        <nav className="nav">
          <NavLink
            exact
            activeClassName="active"
            className="link"
            to={links.link1.path}
          >
            <img className="link__icons" src={blog} alt={links.link1.name} />
            {links.link1.name}
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            className="link"
            to={links.link2.path}
          >
            <img className="link__icons" src={star} alt={links.link2.name} />
            {links.link2.name}
          </NavLink>
          <NavLink
            exact
            activeClassName="active"
            className="link"
            to={links.link3.path}
          >
            <img
              className="link__icons"
              src={settings}
              alt={links.link3.name}
            />
            {links.link3.name}
          </NavLink>
          <a href="#" className="link" onClick={openForm}>
            <img className="link__icons" src={add} alt={links.link3.name} />
            Добавить пост
          </a>
          <LogOut />
          {/* <a href="#" className="link">Добавить пост</a> */}
        </nav>
      </aside>
    </div>
  );
};
