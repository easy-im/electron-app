import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "renderer/assets/base.css";
import Button from "components/Button";
import Input from "components/Input/index";
import { api_login } from "api/login";
import "./RegisterPage.less";

const FormLable: React.FC<{name: string,  children?: React.ReactNode}> = ({name = '', children}) => {
  return <div className="label">
  <div className="name">{name}</div>
  <div>{children}</div>
</div>
}
interface Iprops {
  toLogin: () => void;
}

const RegisterPage: React.FC<Iprops> = ({ toLogin }) => {

  const [accounts, setAccounts] = useState({
    mobile: "",
    password: "",
  });

  const [data, setData] = useState({
    mobileErrInfo: "",
    passwordErrInfo: "",
    loading: false,
  });

  const onChange = ({ e, type }: { e: any; type: "mobile" | "password" }) => {
    setAccounts((pre) => ({
      ...pre,
      [type]: e.target.value,
    }));
  };

  const onRegister = (e: any) => {
  };

  return (
    <form onSubmit={onRegister} className="registerPage-wrapper" action="#">
       <FormLable name="手机号">
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
       </FormLable>
       <FormLable name="昵称">
        <Input
          size="large"
          placeholder="昵称"
          className="account-style"
          value={accounts.mobile}
          maxlength={11}
          errorMsg={data.mobileErrInfo}
          onInput={(e: any) => {
            onChange({ e, type: "mobile" });
          }}
        ></Input>
       </FormLable>
       <FormLable name="密码">
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
       </FormLable>
       <FormLable name="重复密码">
        <Input
          size="large"
          inputType="password"
          placeholder="重复密码"
          className="pwd-style"
          value={accounts.password}
          errorMsg={data.passwordErrInfo}
          onInput={(e: any) => {
            onChange({ e, type: "password" });
          }}
        ></Input>
       </FormLable>
      <div
        className="register-text"
        onClick={() => {
          toLogin();
        }}
      >
        已有帐号去登录
      </div>
      <Button size="large" className="login-btn" block>
        注册
      </Button>
    </form>
  );
};




export default RegisterPage;
