import React, {
  Component,
  memo,
  useState,
  useRef,
  useCallback,
  PureComponent,
} from "react";

const ResponseScreen = memo(({ status, message, onClickScreen }) => {
  return (
    <div id="screen" className={status} onClick={onClickScreen}>
      {message}
    </div>
  );
});

const ResponseAvgTime = memo(({ result, onClickReset }) => {
  return (
    result.length !== 0 && (
      <>
        <div>
          평균 시간: {result.reduce((a, c) => a + c) / result.length} ms
        </div>
        <button onClick={onClickReset}>Reset</button>
      </>
    )
  );
});

const ResponseCheck = memo(() => {
  const [status, setStatus] = useState("waiting");
  const [message, setMessage] = useState("클릭하면 시작합니다");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const clickScreenHandler = useCallback(() => {
    console.log("clickScreenHandler");
    if (status === "waiting") {
      setStatus("ready");
      setMessage("초록색으로 화면이 바뀌면 재빠르게 클릭하세요");
      timeout.current = setTimeout(() => {
        setStatus("now");
        setMessage("지금 누르세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (status === "ready") {
      setStatus("waiting");
      setMessage("너무 빨리 눌렀습니다. 새로 클릭하여 다시 시도해봅시다");
      clearTimeout(timeout.current);
    } else if (status === "now") {
      endTime.current = new Date();
      setStatus("waiting");
      setMessage("잘 했습니다. 다시 해볼까요?");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
      clearTimeout(timeout.current);
    }
  }, [status, timeout, startTime, endTime]);

  const clickResetHandler = useCallback(() => {
    setResult([]);
  }, []);

  return (
    <>
      <ResponseScreen
        status={status}
        onClickScreen={clickScreenHandler}
        message={message}
      />
      <ResponseAvgTime result={result} onClickReset={clickResetHandler} />
    </>
  );
});

export default ResponseCheck;
