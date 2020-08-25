import React, { memo, useState, useEffect, useRef } from "react";

const rspCoords = {
  rock: 0,
  scissor: "-142px",
  paper: "-284px",
};

const scores = {
  rock: 0,
  scissor: 1,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => v[1] === imgCoord)[0];
};

const RSP = memo(() => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef(null);
  const disabled = useRef(false);

  useEffect(() => {
    interval.current = setInterval(changeHand, 300);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const clickBtnHandler = (choice) => () => {
    disabled.current = true;
    clearInterval(interval.current);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다ㅠ");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      disabled.current = false;
      interval.current = setInterval(changeHand, 300);
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button
          id="rock"
          className={disabled.current ? "btn disabled" : "btn"}
          onClick={clickBtnHandler("rock")}
        >
          바위
        </button>
        <button
          id="scissor"
          className={disabled.current ? "btn disabled" : "btn"}
          onClick={clickBtnHandler("scissor")}
        >
          가위
        </button>
        <button
          id="paper"
          className={disabled.current ? "btn disabled" : "btn"}
          onClick={clickBtnHandler("paper")}
        >
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
});

export default RSP;
