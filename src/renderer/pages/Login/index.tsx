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
import { api_login } from "../../api/login";

const App = () => {
  const [accounts, setAccounts] = useState({
    mobile: "",
    password: "",
  });

  const [data, setData] = useState({
    mobileErrInfo: "",
    passwordErrInfo: "",
    loading: false
  });

  const onChange = ({ e, type }: { e: any; type: "mobile" | "password" }) => {
    setAccounts((pre) => ({
      ...pre,
      [type]: e.target.value,
    }));
  };

  const openUpdater = () => {
    ipcRenderer.send(Channels.WINDOW.OPEN, {
      name: "Updater",
    });
  };

  const onSubmit = (e: any) => {
    setData({
      loading: true,
      mobileErrInfo: '',
      passwordErrInfo: ''
    });
    
    if(!accounts.mobile) {
      setData((pre) => ({
        ...pre,
        mobileErrInfo: '请输入帐号',
        loading: false
      }));
      return
    }

    if(!accounts.password) {
      setData((pre) => ({
        ...pre,
        passwordErrInfo: '请输入密码',
        loading: false
      }));
      return
    }
   

    api_login({ mobile: accounts.mobile, password: accounts.password })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setData((pre) => ({
            ...pre,
            loading: false
          }));
        } else {
          console.log("登录失败", res.errmsg);
          setData({
            loading: false,
            mobileErrInfo: res.errmsg || "登录失败",
            passwordErrInfo: res.errmsg || "登录失败",
          });
        }
      })
      .catch((err) => {
        setData({
          loading: false,
          mobileErrInfo:  "登录失败",
          passwordErrInfo: "登录失败",
        });
      });
  };

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
        <form onSubmit={onSubmit} className="form-wrapper" action="#">
          <Input
            size="large"
            placeholder="手机号"
            className="account-style"
            value={accounts.mobile}
            maxlength={11}
            errorMsg={data.mobileErrInfo}
            onInput={(e: any) => {
              onChange({ e, type: "mobile" });
            }}
          ></Input>
          <Input
            size="large"
            inputType="password"
            placeholder="密码"
            className="pwd-style"
            value={accounts.password}
            errorMsg={data.passwordErrInfo}
            onInput={(e: any) => {
              onChange({ e, type: "password" });
            }}
          ></Input>
          <div className="register-text">注册</div>
          <Button size="large" loading={data.loading} className="login-btn" block>
            登录
          </Button>
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
