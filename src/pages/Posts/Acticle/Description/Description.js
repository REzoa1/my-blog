import "./Description.css";

export const Description = ({ description }) => {
  return (
    <div className="description__title">
      {description.length <= 100 && description}
      {description.length > 100 && `${description.slice(0, 100)}...`}
      <span className="button_more">Подробнее</span>
    </div>
  );
};
