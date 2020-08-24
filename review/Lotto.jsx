import React, { memo, PureComponent } from "react";

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

class Lotto extends PureComponent {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonusBall: null,
  };
  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;

    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonusBall: winNumbers[6],
      });
    }, 7000);
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.runTimeouts();
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
  }

  clickRedoHandler = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonusBall: null,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonusBall } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="resultScreen">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonusBall && <Ball key={bonusBall} number={bonusBall} />}
        {bonusBall && (
          <button onClick={this.clickRedoHandler}>다시 뽑기!</button>
        )}
      </>
    );
  }
}

export default Lotto;
