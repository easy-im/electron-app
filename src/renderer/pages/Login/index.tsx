/** @format */

import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "renderer/assets/base.css";
import ReactDOM from "react-dom/client";
import Input from "components/Input/index";
import { Channels } from "share/channels";
import "./index.less";
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

const PageType = {
  Login: "login",
  Register: "register",
};
const App = () => {
  const [data, setData] = useState({
    pageType: PageType.Register,
  });

  const openUpdater = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "Updater",
    });
  };

  const changePageType = (type = PageType.Login) => {
    setData((pre) => ({
      ...pre,
      pageType: type
    }));
  }

  const closeWindow = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "XAHomePage",
      confirmBeforeClose: true,
    });
    ipcRenderer.send(Channels.WINDOW.CLOSE, "Login");
  };

  const isMac = true;

  return (
    <div className="wrapper">
      <div className="login-title-bar">
        {/* 非mac：右上角显示关闭按钮 */}
        {!isMac && (
          <button
            type="button"
            className="easy-im-icon close-btn"
            title="关闭"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow();
            }}
          >
            &#xe759;
          </button>
        )}
      </div>
      <div className="content">
        {/* 登录 */}
        {data.pageType === PageType.Login && (
          <LoginPage toRegister={() => {changePageType(PageType.Register)}} />
        )}
        {/* {注册} */}
        {data.pageType === PageType.Register && <RegisterPage  toLogin={() => {changePageType(PageType.Login)}}  />}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
