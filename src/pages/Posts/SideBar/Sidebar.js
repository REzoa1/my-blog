import "./SideBar.css";
import { links } from "./Link/link";
import { LogOut } from "./LogOut/LogOut";
import { NavLinkForm } from "./NavLinkForm/NavLinkForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noAvatar from "./../../../assets/img/avatar.png";
import {
  faNewspaper,
  faStar,
  faUser,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";

export const SideBar = ({ setIsFormOpen, userStateData }) => {
  const openForm = () => setIsFormOpen(true);
  const localName = localStorage.getItem("localUserName");
  return (
    <aside className="sidebar__main">
      <div className="sidebar__user">
        <img
          src={userStateData.avatar || noAvatar}
          className="sidebar__avatar"
          alt="avatar"
        />
        <h1>{localName}</h1>
        <h2>{userStateData.email}</h2>
      </div>
      <nav className="sidebar__nav">
        <NavLinkForm link={links.link1} icon={faNewspaper} />
        <NavLinkForm link={links.link2} icon={faStar} />
        <NavLinkForm link={links.link3} icon={faUser} />
        <button className="sidebar__link" onClick={openForm}>
          <FontAwesomeIcon icon={faSquarePlus} className="sidebar__icons" />
          Добавить пост
        </button>
        <LogOut />
      </nav>
    </aside>
  );
};
