import React, { PureComponent } from "react";

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

class RSP extends PureComponent {
  state = {
    result: "",
    imgCoord: rspCoords.rock,
    score: 0,
  };

  interval;
  disabled = false;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    }
  };

  componentDidMount() {
    console.log("didmount");
    this.interval = setInterval(this.changeHand, 200);
  }

  componentWillUnmount() {
    console.log("willunmount");
    clearInterval(this.interval);
  }

  clickBtnHandler = (choice) => () => {
    this.disabled = true;
    const { imgCoord } = this.state;
    clearInterval(this.interval);

    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다ㅠ",
          score: prevState.score - 1,
        };
      });
    }
    console.log(this.disabled);
    setTimeout(() => {
      this.disabled = false;
      this.interval = setInterval(this.changeHand, 200);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;

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
            className={this.disabled ? "btn disabled" : "btn"}
            onClick={this.clickBtnHandler("rock")}
          >
            바위
          </button>
          <button
            id="scissor"
            className={this.disabled ? "btn disabled" : "btn"}
            onClick={this.clickBtnHandler("scissor")}
          >
            가위
          </button>
          <button
            id="paper"
            className={this.disabled ? "btn disabled" : "btn"}
            onClick={this.clickBtnHandler("paper")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
  }
}

export default RSP;
