import { ipcRenderer } from "electron";
import React, { useState } from "react";
import "renderer/assets/base.css";
import Button from "components/Button";
import Input from "components/Input/index";
import { api_register } from "@/renderer/api/user";
import { isPhoneNumber } from "utils/index";
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
    nickname: "",
    mobile: "",
    password: "",
    password2: ""
  });

  const [data, setData] = useState({
    mobileErrInfo: "",
    passwordErrInfo: "",
    password2ErrInfo: "",
    loading: false,
  });

  const onChange = ({ e, type }: { e: any; type: "mobile" | "password" | 'nickname' | 'password2' }) => {
    setAccounts((pre) => ({
      ...pre,
      [type]: e.target.value,
    }));
  };

  const onRegister = (e: any) => {
    setData((pre) => ({
      ...pre,
      mobileErrInfo: "",
      passwordErrInfo: "",
      password2ErrInfo: "",
      loading: false,
    }))
    if (!isPhoneNumber(accounts.mobile)) {
      setData((pre) => ({
        ...pre,
        mobileErrInfo: '手机号不正确'
      }))
    } else if (!accounts.password || accounts.password.length < 6 || accounts.password.length > 18) {
      setData((pre) => ({
        ...pre,
        passwordErrInfo: '请输入6～18位密码'
      }))
    } else if (accounts.password !== accounts.password2) {
      setData((pre) => ({
        ...pre,
        passwordErrInfo: '两次密码不相同',
        password2ErrInfo: '两次密码不相同'
      }))
    } else {
      api_register({mobile: accounts.mobile, password: accounts.password, nickname: accounts.nickname}).then(res => {
        // 注册成功跳转，登陆页面
        toLogin()
      }).catch(() => {
        
      })
    }
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
          value={accounts.nickname}
          maxlength={11}
          errorMsg={data.mobileErrInfo}
          onInput={(e: any) => {
            onChange({ e, type: "nickname" });
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
          value={accounts.password2}
          errorMsg={data.password2ErrInfo}
          onInput={(e: any) => {
            onChange({ e, type: "password2" });
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
