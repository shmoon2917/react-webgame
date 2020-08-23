import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    status: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  clickScreenHandler = () => {
    const { status, message, result } = this.state;
    if (status === "waiting") {
      this.setState({
        status: "ready",
        message: "초록색이 되면 클릭하세요.",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          status: "now",
          message: "지금 클릭하세요!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (status === "ready") {
      // 성급한 클릭
      this.setState({
        status: "waiting",
        message: "너무 성급하셨군요! 초록색이 된 후에 클릭하세요",
      });
      clearTimeout(this.timeout);
    } else if (status === "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          status: "waiting",
          result: [...prevState.result, this.endTime - this.startTime],
          message: "클릭해서 시작하세요",
        };
      });
    }
  };

  resetButtonHandler = () => {
    this.setState({
      result: [],
    });
  };

  renderAverageTime = () => {
    const { result } = this.state;
    // {삼항 연산자 또는 부호 연산자 (삼항 연산자많이 씀)}
    return (
      result.length !== 0 && (
        <>
          <div>
            평균 시간:
            {result.reduce((a, c) => a + c) / result.length}
            ms
          </div>
          <button onClick={this.resetButtonHandler}>Reset</button>
        </>
      )
    );
  };

  render() {
    return (
      <>
        <div
          id="screen"
          className={this.state.status}
          onClick={this.clickScreenHandler}
        >
          {this.state.message}
        </div>
        {this.renderAverageTime()}
      </>
    );
  }
}

export default ResponseCheck;
