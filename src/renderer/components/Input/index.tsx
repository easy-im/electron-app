/** @format */

import React, { useMemo, useState } from "react";

import "./index.less";
interface Iprops extends NSInputProps.InputProps {
  size?: "large" | "middle" | "small";
  inputType?: "text" | "password" | "number";
  placeholder?: string;
  className?: string;
  leftIconCode?: string;
  rightIconCode?: string;
  errorMsg?: string;
  onClickRightIcon?: () => void;
}

const Input: React.FC<Iprops> = React.memo(
  ({
    size = "middle",
    placeholder = "请输入",
    className,
    rightIconCode,
    inputType = "text",
    value,
    onClickRightIcon = () => {},
    onInput,
    maxlength=112,
    errorMsg=''
  }) => {
    const [type, setType] = useState(inputType);

    // 密码显示/隐藏
    const toggleShowPassword = () => {
      if (type === "password") {
        setType("text");
      } else {
        setType("password");
      }
    };

    return (
      <div className={`input-wrapper ${size} ${className} ${errorMsg && 'error-wrap'}`}>
        <input className="input-type" maxLength={maxlength} value={value} onInput={onInput} placeholder={placeholder} type={type} />
        {rightIconCode && (
          <span className="right-icon easy-im-icon" onClick={onClickRightIcon}>
            {rightIconCode}
          </span>
        )}
        {inputType === "password" && (
          <span className="right-icon" onClick={toggleShowPassword}>
            {type === "password" ? (
              <i className="easy-im-icon">&#xe71e;</i>
            ) : (
              <i className="easy-im-icon">&#xe720;</i>
            )}
          </span>
        )}
        <span className="error-msg">{errorMsg}</span>
      </div>
    );
  }
);

export default Input;
