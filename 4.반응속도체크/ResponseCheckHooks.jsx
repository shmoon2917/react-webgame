import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const clickScreenHandler = () => {
    if (status === "waiting") {
      setStatus("ready");
      setMessage("초록색이 되면 클릭하세요.");
      timeOut.current = setTimeout(() => {
        setStatus("now");
        setMessage("지금 클릭하세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (status === "ready") {
      // 성급한 클릭
      setStatus("waiting");
      setMessage("너무 성급하셨군요! 초록색이 된 후에 클릭하세요");
      clearTimeout(timeOut.current);
    } else if (status === "now") {
      // 반응속도 체크
      endTime.current = new Date();
      setStatus("waiting");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
      setMessage("클릭해서 시작하세요");
    }
  };

  const resetButtonHandler = () => {
    setResult([]);
  };

  const renderAvgTime = () => {
    // {삼항 연산자 또는 부호 연산자 (삼항 연산자많이 씀)}
    return (
      result.length !== 0 && (
        <>
          <div>
            평균 시간:
            {result.reduce((a, c) => a + c) / result.length}
            ms
          </div>
          <button onClick={resetButtonHandler}>Reset</button>
        </>
      )
    );
  };

  return (
    <>
      <div id="screen" className={status} onClick={clickScreenHandler}>
        {message}
      </div>
      {renderAvgTime()}
    </>
  );
};

export default ResponseCheck;
