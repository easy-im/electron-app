/** @format */

import React, { useMemo } from "react";
import "./index.less";

interface Iprops {
  onClick?: (params?: any) => void;
  cusStyle?: any;
}

const BackButton: React.FC<Iprops> = React.memo(({ onClick = () => {}, cusStyle }) => {
  return (
    <div
      className="BackBtnWrap"
      {...cusStyle}
      onClick={onClick}
    >
      <i className="easy-im-icon">&#xe7b2;</i>
      返回
    </div>
  );
});

export default BackButton;
