import React, { useMemo } from "react";
import "./index.less";

interface Iprops {
  loading?: boolean;
  size?: "large" | "middle" | "small";
  children: React.ReactNode;
  block?: boolean;
  className?: string;
}

const Button: React.FC<Iprops> = React.memo(
  ({ size, loading, className, block = false, children }) => {
    return (
      <button
        className={`btn-style primary ${block && "block"} ${size} ${className}`}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {children ? children : null}
      </button>
    );
  }
);

export default Button;
