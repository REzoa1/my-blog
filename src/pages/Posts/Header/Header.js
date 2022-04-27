import headerStyles from "./Header.module.css";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className={headerStyles.main}>
          <h3 className={headerStyles.title}>Blog Page</h3>
          <div className={headerStyles.img}>
            <p className={headerStyles.text}>Slogan!</p>
          </div>
        </div>
      </div>
    </header>
  );
};
