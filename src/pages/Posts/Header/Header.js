import headerStyles from "./Header.module.css";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={headerStyles.main}>
          <div className={headerStyles.img}>
            <p className={headerStyles.text}>Blog Page</p>
          </div>
        </div>
      </div>
    </header>
  );
};
