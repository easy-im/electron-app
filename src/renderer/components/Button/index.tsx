/** @format */

import React, { useMemo } from "react";
import "./index.less";

interface Iprops {
  loading?: boolean;
  size?: "large" | "middle" | "small";
  children: React.ReactNode;
  block?: boolean;
  className?: string;
  onClick?: (params?: any) => void;
}

const Button: React.FC<Iprops> = React.memo(
  ({
    size,
    loading,
    onClick = () => {},
    className,
    block = false,
    children,
  }) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`btn-style primary ${block && "block"} ${size} ${className}`}
      >
        {loading && (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {children ? children : null}
      </button>
    );
  }
);

export default Button;
