import "./Description.css";
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Description = ({ description }) => {
  // const [isFullDesc, setisFullDesc] = useState(false);
  // const hideDesc = () => setisFullDesc(false);
  return (
    <div className="description__title">
      {description.length <= 100 && description}
      {description.length > 100 && (
        <>
          {`${description.slice(0, 100)}...`}
          <div className="button_more">Подробнее</div>
        </>
      )}
    </div>
  );
};
