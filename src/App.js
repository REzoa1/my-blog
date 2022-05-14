import "./App.css";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Switch } from "react-router-dom";
import { MainBlock } from "./components/MainBlock/MainBlock";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";

function App() {
  return (
    <Switch>
      <PublicRoute exact path="/login">
        <LoginPage />
      </PublicRoute>
      <PrivateRoute path="/">
        <MainBlock />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
