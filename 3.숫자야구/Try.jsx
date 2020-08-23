import React, { memo, useState } from "react";

const Try = memo(({ tryInfo }) => {
  //부모로부터 받은 PROPS 변경하기
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult("1");
  };

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div onClick={onClick}>{result}</div>
    </li>
  );
});

export default Try;
