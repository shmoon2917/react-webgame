import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

function getWinNumbers() {
  console.log("getWinNumbers");
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

const Lotto = memo(() => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setWinBalls] = useState([]);
  const [bonusBall, setBonusBall] = useState(null);
  const timeouts = useRef([]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="resultScreen">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonusBall && <Ball number={bonusBall} onClick={clickRedoHandler} />}
      {bonusBall && <button onClick={clickRedoHandler}>또 뽑기!</button>}
    </>
  );
});

export default memo;
