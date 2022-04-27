
import React from "react";
import ReactDOM from "react-dom";

import { useHistory } from "react-router-dom";
// import './index.css';

import ruRU from "antd/lib/locale/ru_RU";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import App from "./App";

import { AppProvider } from "./AppProvider";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import reportWebVitals from "./reportWebVitals";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    {/* <AppProvider > */}
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider locale={ruRU}>
          <App />
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
    {/* </AppProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
