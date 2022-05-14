import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Description.css";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export const Description = ({ description }) => {
  return (
    <div className="description__title">
      {description.length <= 100 && description}
      {description.length > 100 && `${description.slice(0, 100)}...`}
      <div className="button_more">
        Подробнее
        <FontAwesomeIcon icon={faArrowRight} className="button_arrow"/>
      </div>
    </div>
  );
};
