import React, { useMemo } from "react";

interface Iprops {}

const Input: React.FC<Iprops> = React.memo(({}) => {
  return <input />;
});

export default Input;
