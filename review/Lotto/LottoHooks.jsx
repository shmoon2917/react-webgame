import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

function getWinNumbers() {
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  console.log("getWinNumbers", [...winNumbers, bonusNumber]);
  return [...winNumbers, bonusNumber];
}

const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }

  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

const Lotto = memo(() => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  // const [winNumbers, setWinNumbers] = useState(getWinNumbers);
  // getNumbers 함수를 그대로 넣어줘도 잘 작동함
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonusBall, setBonusBall] = useState(null);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect", winNumbers);
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonusBall(winNumbers[6]);
    }, 7000);
    return () => {
      console.log("종료");
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [timeouts.current]);

  const clickRedoHandler = useCallback(() => {
    // console.log("onclickRedoHandler", winNumbers);
    // 함수 안에서 state 값 참조해야 한다면 인풋 배열에 state 요소 추가
    setWinNumbers(getWinNumbers);
    setWinBalls([]);
    setBonusBall(null);
    console.log("current 초기화되기 전");
    timeouts.current = [];
  }, []);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="resultScreen">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonusBall && <Ball number={bonusBall} />}
      {bonusBall && <button onClick={clickRedoHandler}>또 뽑기!</button>}
    </>
  );
});

export default Lotto;
