/** @format */

import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "renderer/assets/base.css";
import ReactDOM from "react-dom/client";
import Input from "components/Input/index";
import { Channels } from "share/channels";
import { setUser } from "utils/index";
import Button from "components/Button";
import "./index.less";
// @ts-ignore  todo 待处理url引入问题
import img from "../../assets/images/logo/logo.png";
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

const PageType = {
  Login: "login",
  Register: "register",
};
const App = () => {
  const [data, setData] = useState({
    pageType: PageType.Login,
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
      <div className="logo">
        {/* <img src={`../../assets/images/logo/logo.png`} alt="" /> */}
        <img src={img} alt="" />
      </div>
      <div className="title-bar">Easy IM</div>
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
