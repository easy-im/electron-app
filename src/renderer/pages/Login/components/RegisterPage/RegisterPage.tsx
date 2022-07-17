import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "renderer/assets/base.css";
import Button from "components/Button";
import { api_login } from "api/login";
import "./RegisterPage.less";

interface Iprops {
  toLogin: () => void;
}

const RegisterPage: React.FC<Iprops> = ({ toLogin }) => {

  const onRegister = (e: any) => {
  };

  return (
    <form onSubmit={onRegister} className="registerPage-wrapper" action="#">
      <div
        className="register-text"
        onClick={() => {
          toLogin();
        }}
      >
        已有帐号去注册
      </div>
      <Button size="large" className="login-btn" block>
        注册
      </Button>
    </form>
  );
};

export default RegisterPage;
