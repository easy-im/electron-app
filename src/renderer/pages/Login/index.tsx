import { ipcRenderer } from "electron";
import React from "react";
import "renderer/assets/base.css";
import ReactDOM from "react-dom/client";
import Input from "components/Input/index";
import { Channels } from "share/channels";
import Button from "components/Button";
import "./styles.css";
import "./index.less";
// @ts-ignore  todo 待处理url引入问题
import img from "../../assets/images/logo/logo.png";

const App = () => {
  const openUpdater = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "Updater",
    });
  };

  const onSubmit = () => {};
  const closeWindow = () => {};

  const isMac = false;

  return (
    <div className="wrapper">
      <div className="login-title-bar">
        {isMac && (
          <button
            type="button"
            className="tutor-icon closeBtn"
            title="关闭"
            onClick={closeWindow}
          >
            &#xe611;
          </button>
        )}
      </div>
      <div className="logo">
        {/* <img src="../../assets/images/logo/logo.png" alt="" /> */}
        <img src={img} alt="" />
      </div>
      <div className="title-bar">Easy IM</div>
      <div className="content">
        <form onSubmit={onSubmit} className="form-wrapper">
          <Input
            size="large"
            placeholder="手机号"
            className="account-style"
          ></Input>
          <Input size="large" placeholder="密码" className="pwd-style"></Input>
          <Button size="large" className="login-btn" block>登录</Button>
        </form>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
