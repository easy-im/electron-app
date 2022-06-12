import React, { useMemo } from "react";

import "./index.less";
interface Iprops {
  size?: "large" | "middle" | "small";
  placeholder?: string;
  className?: string;
}

const Input: React.FC<Iprops> = React.memo(
  ({ size = "middle", placeholder = "请输入", className }) => {
    return (
      <div className={`input-wrapper ${size} ${className}`}>
        <input className="input-type" placeholder={placeholder} />
      </div>
    );
  }
);

export default Input;
