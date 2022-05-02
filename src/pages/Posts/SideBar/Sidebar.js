import "./SideBar.css";
import { links } from "./Link/link";
import blog from "./../../../assets/img/svg/blog.svg";
import star from "./../../../assets/img/svg/star.svg";
import settings from "./../../../assets/img/svg/settings.svg";
import add from "./../../../assets/img/svg/add.svg";
import { LogOut } from "./LogOut/LogOut";
import { NavLinkForm } from "./NavLinkForm/NavLinkForm";

export const SideBar = ({ setIsFormOpen, avatar, userName }) => {
  const openForm = () => setIsFormOpen(true);
  return (
    <div>
      <aside className="side_bar">
        <div className="user">
          <img src={avatar} className="avatar" alt="avatar" />
          <h1>{userName}</h1>
        </div>
        <nav className="nav">
          <NavLinkForm to={links.link1} src={blog} />
          <NavLinkForm to={links.link2} src={star} />
          <NavLinkForm to={links.link3} src={settings} />
          <a href="#" className="link" onClick={openForm}>
            <img className="link__icons" src={add} alt="пост" />
            Добавить пост
          </a>
          <LogOut />
        </nav>
      </aside>
    </div>
  );
};
