import React, { useState, useRef, memo, PureComponent } from "react";

class ResponseAverageTime extends PureComponent {
  render() {
    console.log("render response average time");
    const { result, onClickReset } = this.props;
    return (
      result.length !== 0 && (
        <>
          <div>
            평균 시간: {result.reduce((a, c) => a + c) / result.length} ms
          </div>
          <button onClick={onClickReset}>reset</button>
        </>
      )
    );
  }
}

const ResponseScreen = () => {
  const { status, message, onClickScreen } = this.props;
  console.log("render response screen");
  return (
    <div id="screen" className={status} onClick={onClickScreen}>
      {message}
    </div>
  );
};

const ResponseCheck = () => {
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("클릭하면 시작합니다");
  const [result, setResult] = useState([]);

  const timeOut = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const clickScreenHandler = () => {
    if (status === "waiting") {
      setStatus("ready");
      setMessage("초록색으로 화면이 바뀌면 재빠르게 누르세요");
      timeOut.current = setTimeout(() => {
        setStatus("now");
        setMessage("지금 누르세요");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === "ready") {
      setStatus("waiting");
      setMessage("너무 빨리 눌렀습니다. 새로 클릭하여 다시 시작해보세요");
      clearTimeout(timeOut.current);
    } else if (status === "now") {
      endTime.current = new Date();
      setStatus("waiting");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
      setMessage("클릭해서 시작하세요");
      clearTimeout(timeOut.current);
    }
  };

  const resetAvgTimeHandler = () => {
    setResult([]);
  };
  return (
    <>
      <ResponseScreen
        status={status}
        message={message}
        onClickScreen={clickScreenHandler}
      />
      <ResponseAverageTime result={result} onClickReset={resetAvgTimeHandler} />
    </>
  );
};

export default ResponseCheck;
