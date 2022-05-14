import { useHistory } from "react-router-dom";
import { logOut } from "../../../../store/slices/auth";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleExit = () => {
    dispatch(logOut());
    history.push("/login");
  };
  return (
    <button className="sidebar__link" onClick={handleExit}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebar__icons" />
      Выход
    </button>
  );
};
