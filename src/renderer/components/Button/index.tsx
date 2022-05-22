import React, { useMemo } from "react";

interface Iprops {
  text: string;
}

const Button: React.FC<Iprops> = React.memo(({ text }) => {
  return <div>{text}</div>;
});

export default Button;
