import "./Footer.css";

export const Footer = () => {
  const logYear = String(new Date().getFullYear());
  return (
    <footer>
      <div className="container">
        <h3 className="footer">
          Footer - 20<span>{logYear.substring(2, 4)}</span>
        </h3>
      </div>
    </footer>
  );
};

