import React, { useMemo } from "react";
import "./index.less";
interface Iprops {
  size: "large" | "middle" | "small";
}

const Input: React.FC<Iprops> = React.memo(({ size = "middle" }) => {
  return (
    <div className="input-wrapper">
      <input className="input-type" />
    </div>
  );
});

export default Input;
