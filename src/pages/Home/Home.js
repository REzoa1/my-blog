import { useDocumentTitle } from "../../utils/hooks";
// import "./Home.css"

export const Home = () => {
  useDocumentTitle("Главная");

  return (
   <div className="container">
      <h1 className="home__title">Добро пожаловать, <br></br> </h1>
    </div>
  );
};
